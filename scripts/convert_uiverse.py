"""Convert public/uiverse/{type}.jsonl -> public/uiverse/{type}.json + manifest.json.
Run after the detail scrape completes (or partially for testing)."""
import os, json, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UI = os.path.join(ROOT, 'public', 'uiverse')
os.makedirs(UI, exist_ok=True)

CAP = 150  # per-type cap (matches scrape cap)

by_type = {}
for path in glob.glob(os.path.join(UI, '*.jsonl')):
    t = os.path.basename(path)[:-len('.jsonl')]
    arr = []
    with open(path, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                arr.append(json.loads(line))
            except Exception:
                pass
    # keep first CAP (listing order)
    by_type[t] = arr[:CAP]

manifest = {}
for t, arr in sorted(by_type.items(), key=lambda kv: -len(kv[1])):
    json.dump(arr, open(os.path.join(UI, f'{t}.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    manifest[t] = len(arr)
    print(f'  {t}.json  {len(arr)}')

json.dump(manifest, open(os.path.join(UI, 'manifest.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
total = sum(manifest.values())
print('manifest total:', total)
