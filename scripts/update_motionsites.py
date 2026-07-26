import json, os

DATA = 'src/data/motionsitesPrompts.json'
DESK = 'C:/Users/Administrator/Desktop'

def read_prompt(n):
    with open(os.path.join(DESK, f'{n}.txt'), encoding='utf-8-sig') as f:
        return f.read().strip()

prompts = {n: read_prompt(n) for n in range(1, 8)}

d = json.load(open(DATA, encoding='utf-8'))

# id -> upgrade spec. prompt comes from txt file.
upgrade = {
    '3d-jack-portfolio-hero': dict(prompt=prompts[1], title="Jack — 3D Creator",
        category="3D Portfolio Landing Page", type="landing", page_type="landing"),
    'prisma-landing': dict(prompt=prompts[2], title="Prisma",
        category="Creative Studio Landing Page", type="landing", page_type="landing"),
    'axion-about': dict(prompt=prompts[4], title="Axion Studio",
        category="Design Agency Landing Page", type="landing", page_type="landing"),
    'asme-hero': dict(prompt=prompts[5], title="Asme",
        category="Brand & Newsletter Landing Page", type="landing", page_type="landing"),
    'aura-email-client': dict(prompt=prompts[6], title="Aura",
        category="Email Client Landing Page", type="landing", page_type="landing",
        video_preview_url="/sucaiku/motionsites-assets/aura.mp4", has_assets=True),
    'lithos-geology-hero': dict(prompt=prompts[7], title="Lithos",
        category="Geology Brand Hero", type="hero", page_type="hero",
        image_preview_url="/sucaiku/motionsites-assets/lithos.webp", has_assets=True),
}
upgrade_ids = set(upgrade.keys())

out = []
deleted = []
for e in d:
    eid = e['id']
    if eid in upgrade:
        spec = upgrade[eid]
        e['prompt_text'] = spec['prompt']
        e['title'] = spec['title']
        e['category'] = spec['category']
        e['type'] = spec['type']
        e['page_type'] = spec['page_type']
        if 'video_preview_url' in spec:
            e['video_preview_url'] = spec['video_preview_url']
        if 'image_preview_url' in spec:
            e['image_preview_url'] = spec['image_preview_url']
        if 'has_assets' in spec:
            e['has_assets'] = spec['has_assets']
        out.append(e)
    else:
        # delete entries that cannot be previewed (no preview media at all)
        has_preview = bool(e.get('video_preview_url') or e.get('image_preview_url'))
        if has_preview:
            out.append(e)
        else:
            deleted.append(eid)

# add new prmpt entry (txt3)
new_entry = {
    "id": "prmpt-fashion-archive",
    "title": "prmpt",
    "category": "Fashion Archive Landing Page",
    "image_preview_url": None,
    "video_preview_url": "/sucaiku/motionsites-assets/prmpt.mp4",
    "is_free": True,
    "type": "landing",
    "page_type": "landing",
    "types": None,
    "sort_order": 0,
    "row_span": 1,
    "has_assets": True,
    "prompt_text": prompts[3],
    "replicated": False,
    "route": None,
}
out.append(new_entry)

json.dump(out, open(DATA, 'w', encoding='utf-8'), indent=2, ensure_ascii=False)

print("before:", len(d), "after:", len(out))
print("deleted count:", len(deleted))
print("deleted ids:", deleted)
print("kept upgrade ids:", sorted(upgrade_ids))
