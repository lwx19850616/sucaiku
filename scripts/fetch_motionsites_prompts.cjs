const fs = require('fs');
const path = require('path');

const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnZHp5cWZhbGJpYnplbHBkcHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzUwMDYsImV4cCI6MjA4NzQxMTAwNn0.u8lH5Y14xx2WxrNEBp8ngkJlijIYHJASq_gOzTaINZY';

async function fetchList() {
  const res = await fetch('https://xgdzyqfalbibzelpdpvr.supabase.co/rest/v1/prompts?is_free=eq.true&select=id,title,category,image_preview_url,video_preview_url,is_free,type,page_type,types,sort_order,row_span,has_assets', {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }
  });
  if (!res.ok) throw new Error(`list ${res.status}`);
  return await res.json();
}

async function fetchPrompt(id) {
  const res = await fetch('https://xgdzyqfalbibzelpdpvr.supabase.co/functions/v1/get-prompt', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt_id: id })
  });
  const data = await res.json();
  return data.prompt_text || null;
}

async function main() {
  const list = await fetchList();
  console.log(`free prompts: ${list.length}`);
  const results = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    try {
      const text = await fetchPrompt(item.id);
      results.push({ ...item, prompt_text: text });
      console.log(`[${i + 1}/${list.length}] ${item.id}: ${text ? text.length + ' chars' : 'NO TEXT'}`);
    } catch (e) {
      console.error(`[${i + 1}/${list.length}] ${item.id}: ERROR ${e.message}`);
      results.push({ ...item, prompt_text: null, error: e.message });
    }
  }
  const out = path.join(__dirname, '..', 'src', 'data', 'motionsitesPrompts.json');
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log(`written ${out}`);
}

main().catch(e => { console.error(e); process.exit(1); });
