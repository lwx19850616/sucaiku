"""Paginate uiverse.io/elements in chunks. Usage:
  python scripts/scrape_uiverse_listing.py START END
Appends results to /tmp/uiverse_listing.json (merges if exists).
"""
import sys, os, urllib.request, re, json, time

HDR = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://uiverse.io/',
}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, 'scripts', '.cache')
os.makedirs(CACHE, exist_ok=True)
BASE = 'https://uiverse.io/elements?page='
OUT = os.path.join(CACHE, 'uiverse_listing.json')

START = int(sys.argv[1]) if len(sys.argv) > 1 else 0
END = int(sys.argv[2]) if len(sys.argv) > 2 else 999


def fetch_json(page):
    last = None
    for _ in range(5):
        try:
            html = urllib.request.urlopen(urllib.request.Request(BASE + str(page), headers=HDR), timeout=60).read().decode('utf-8', 'ignore')
            m = re.search(r'window\.__remixContext\s*=\s*(\{.*?\});?</script>', html, re.S)
            if not m:
                raise ValueError('no remix context')
            return json.loads(m.group(1))
        except Exception as e:
            last = e
            time.sleep(2.0)
    raise last


existing = []
if os.path.exists(OUT):
    existing = json.load(open(OUT, encoding='utf-8'))
seen = {(p['username'], p['friendlyId']) for p in existing}

for page in range(START, END):
    d = fetch_json(page)
    cat = d['state']['loaderData']['routes/$category']
    for p in cat.get('posts', []):
        u = p.get('user') or {}
        key = (u.get('username'), p.get('friendlyId'))
        if key in seen:
            continue
        seen.add(key)
        existing.append({
            'type': p.get('type'),
            'friendlyId': p.get('friendlyId'),
            'username': u.get('username'),
            'theme': p.get('theme'),
            'backgroundColor': p.get('backgroundColor'),
            'isTailwind': p.get('isTailwind'),
        })
    if not cat.get('hasNextPage'):
        break
    time.sleep(0.1)

json.dump(existing, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False)
print(f'pages {START}-{END} done. total so far: {len(existing)}')
