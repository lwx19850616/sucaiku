// 把 motionsites 预览资源下载到 public/motionsites-assets/，本地化彻底摆脱外链依赖
// mux m3u8 不下载（由前端 hls.js 播放），其余下载；失败则保留原远程 URL 作为 fallback
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'src/data/motionsitesPrompts.json');
const OUT_DIR = path.join(ROOT, 'public/motionsites-assets');
fs.mkdirSync(OUT_DIR, { recursive: true });

const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

function getPreviewUrl(item) {
  return item.video_preview_url || item.image_preview_url;
}

// 从 URL 推断扩展名；higgs.ai 之类无扩展名的按 Content-Type 推断
function extFromUrl(url) {
  const clean = url.split('?')[0];
  const m = clean.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1].toLowerCase() : null;
}

function fetchHead(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36' } }, (res) => {
      // 跟随一次重定向
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(fetchHead(new URL(res.headers.location, url).toString()));
        res.resume();
        return;
      }
      const ct = (res.headers['content-type'] || '').toLowerCase();
      let ext = extFromUrl(url);
      if (!ext) {
        if (ct.includes('webp')) ext = 'webp';
        else if (ct.includes('png')) ext = 'png';
        else if (ct.includes('gif')) ext = 'gif';
        else if (ct.includes('jpeg') || ct.includes('jpg')) ext = 'jpg';
        else if (ct.includes('mp4')) ext = 'mp4';
        else ext = 'bin';
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, ext, buf: Buffer.concat(chunks) }));
    });
    req.on('error', () => resolve(null));
    req.setTimeout(30000, () => { req.destroy(); resolve(null); });
    req.end();
  });
}

(async () => {
  let ok = 0, skip = 0, fail = 0;
  const report = [];
  for (const item of data) {
    const url = getPreviewUrl(item);
    const id = item.id;
    if (!url) { skip++; report.push([id, 'no-url']); continue; }
    // mux m3u8 不下载，前端用 hls.js
    if (/\.m3u8(\?|$)/i.test(url)) { skip++; report.push([id, 'm3u8-keep-remote']); continue; }
    const res = await fetchHead(url);
    if (!res || res.status !== 200 || res.buf.length < 100) {
      fail++; report.push([id, 'download-fail', res ? res.status : 'err']);
      continue;
    }
    const fname = `${id}.${res.ext}`;
    fs.writeFileSync(path.join(OUT_DIR, fname), res.buf);
    // 写回本地路径（带 /sucaiku base）
    const local = `/sucaiku/motionsites-assets/${fname}`;
    if (item.video_preview_url === url) item.video_preview_url = local;
    else item.image_preview_url = local;
    ok++; report.push([id, 'ok', res.ext, res.buf.length]);
  }
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
  // 写出报告
  const total = ok + skip + fail;
  const lines = [`OK=${ok} SKIP=${skip} FAIL=${fail} TOTAL=${total}`];
  for (const r of report) lines.push(r.join('\t'));
  fs.writeFileSync(path.join(OUT_DIR, '_download_report.txt'), lines.join('\n'));
  console.log(lines[0]);
  console.log('FAIL/keep-remote list:');
  for (const r of report) if (r[1] !== 'ok') console.log(' ', r.join(' '));
  // 输出目录体积
  const du = execSync(`du -sh "${OUT_DIR}"`).toString().trim();
  console.log('assets dir size:', du);
})();
