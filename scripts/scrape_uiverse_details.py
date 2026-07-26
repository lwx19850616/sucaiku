"""Step 2 (chunked, resumable, per-type capped): fetch html+css for listing items.
Appends each result as one JSON line to public/uiverse/{type}.jsonl.

Features:
- Resume: rebuilds 'done' set + per-type counts from existing jsonl files (persist on disk).
- Cap: stops fetching a type once it reaches CAP (default 150).
- Type partition: pass `--types button,card` to only handle those types (safe to run in parallel).

Usage:
  python scripts/scrape_uiverse_details.py START END [--types t1,t2]
"""
import sys, os, json, time, argparse
import urllib.request, re

HDR = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://uiverse.io/',
}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, 'scripts', '.cache')
OUT = os.path.join(ROOT, 'public', 'uiverse')
os.makedirs(CACHE, exist_ok=True)
os.makedirs(OUT, exist_ok=True)
LISTING = os.path.join(CACHE, 'uiverse_listing.json')
DONE = os.path.join(CACHE, 'uiverse_done.json')
CAP = 150

ap = argparse.ArgumentParser()
ap.add_argument('start', type=int, nargs='?', default=0)
ap.add_argument('end', type=int, nargs='?', default=None)
ap.add_argument('--types', default='')
args = ap.parse_args()
assigned = [t.strip() for t in args.types.split(',') if t.strip()]

listing = json.load(open(LISTING, encoding='utf-8'))
END = args.end if args.end is not None else len(listing)
listing = listing[args.start:END]
if assigned:
    listing = [it for it in listing if it.get('type') in assigned]

# rebuild done set + per-type counts from existing jsonl (survives restarts)
done = set()
count_by_type = {}
for fn in os.listdir(OUT):
    if not fn.endswith('.jsonl'):
        continue
    t = fn[:-len('.jsonl')]
    with open(os.path.join(OUT, fn), encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except Exception:
                continue
            done.add(f"{rec.get('username')}/{rec.get('friendlyId')}")
            count_by_type[t] = count_by_type.get(t, 0) + 1

fhs = {}  # type -> file handle (append)


def get_fh(t):
    if t not in fhs:
        fhs[t] = open(os.path.join(OUT, f'{t}.jsonl'), 'a', encoding='utf-8')
    return fhs[t]


def fetch_detail(item):
    url = f"https://uiverse.io/{item['username']}/{item['friendlyId']}"
    for _ in range(4):
        try:
            html = urllib.request.urlopen(urllib.request.Request(url, headers=HDR), timeout=45).read().decode('utf-8', 'ignore')
            m = re.search(r'window\.__remixContext\s*=\s*(\{.*?\});?</script>', html, re.S)
            d = json.loads(m.group(1))
            post = d['state']['loaderData']['routes/$username.$friendlyId']['post']
            html_code = post.get('html') or ''
            css_code = post.get('css') or ''
            if not html_code.strip() and not css_code.strip():
                return None
            return {
                'username': item['username'],
                'friendlyId': item['friendlyId'],
                'type': post.get('type') or item['type'] or 'unknown',
                'theme': post.get('theme'),
                'backgroundColor': post.get('backgroundColor'),
                'isTailwind': post.get('isTailwind'),
                'title': post.get('title'),
                'html': html_code,
                'css': css_code,
            }
        except Exception:
            time.sleep(1.0)
    return None


ok = 0
skip = 0
for item in listing:
    t = item.get('type')
    if not t:
        skip += 1
        continue
    if assigned and t not in assigned:
        continue
    key = f"{item['username']}/{item['friendlyId']}"
    if key in done:
        skip += 1
        continue
    if count_by_type.get(t, 0) >= CAP:
        # type already full; skip fetching but don't mark done (harmless)
        continue
    rec = fetch_detail(item)
    if rec:
        rt = rec.get('type') or t
        fh = get_fh(rt)
        fh.write(json.dumps(rec, ensure_ascii=False) + '\n')
        fh.flush()
        done.add(key)
        count_by_type[rt] = count_by_type.get(rt, 0) + 1
        ok += 1
        time.sleep(0.15)

for fh in fhs.values():
    fh.close()
print(f'[{args.types or "ALL"}] slice {args.start}:{END} ok={ok} skip={skip} counts={count_by_type}')
