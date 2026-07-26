# 补齐 motionsites 预览资源本地化：扫描每个 item 的 image_preview_url 与 video_preview_url
# 把仍是外链（非 m3u8）的 URL 下载到 public/motionsites-assets/，写回本地路径。
# mux m3u8 保留远程（前端 hls.js 播放）。
import json, os, re, urllib.request, ssl

ROOT = r'C:/Users/Administrator/WorkBuddy/Claw/portfolio'
JSON = os.path.join(ROOT, 'src/data/motionsitesPrompts.json')
OUT = os.path.join(ROOT, 'public/motionsites-assets')
os.makedirs(OUT, exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

data = json.load(open(JSON, encoding='utf-8'))


def ext_from(url, ct):
    clean = url.split('?')[0]
    m = re.search(r'\.([a-zA-Z0-9]+)$', clean)
    if m:
        return m.group(1).lower()
    ct = (ct or '').lower()
    for k in ['webp', 'png', 'gif', 'jpeg', 'jpg', 'mp4', 'mov']:
        if k in ct:
            return k
    return 'bin'


def download(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Referer': 'https://motionsites.ai/'})
    with urllib.request.urlopen(req, timeout=40, context=ctx) as r:
        return r.status, r.read(), r.headers.get('content-type', '')


count = 0
for it in data:
    for field in ('image_preview_url', 'video_preview_url'):
        u = it.get(field)
        if not u or u.startswith('/sucaiku/') or '.m3u8' in u:
            continue
        suffix = '_img' if field == 'image_preview_url' else '_vid'
        try:
            st, buf, ct = download(u)
        except Exception as e:
            print('FAIL', it.get('id'), field, repr(e)[:80])
            continue
        if st != 200 or len(buf) < 200:
            print('SKIP', it.get('id'), field, st, len(buf))
            continue
        ext = ext_from(u, ct)
        fname = f"{it['id']}{suffix}.{ext}"
        open(os.path.join(OUT, fname), 'wb').write(buf)
        it[field] = f"/sucaiku/motionsites-assets/{fname}"
        count += 1
        print('OK', fname, len(buf))

json.dump(data, open(JSON, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('localized', count, 'more external URLs')
