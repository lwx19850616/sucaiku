#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Port Matt Pocock skills (zh-CN) into WorkBuddy project-level skill format.

Source: /tmp/mp-skills/skills/{engineering,productivity,misc}/*
Excludes: deprecated, in-progress, personal (Claude-Code specific / irrelevant)
Dest: C:/Users/Administrator/WorkBuddy/Claw/.workbuddy/skills/<name>/
"""
import os, re, shutil

SRC = "C:/Users/Administrator/AppData/Local/Temp/mp-skills/skills"
DEST = "C:/Users/Administrator/WorkBuddy/Claw/.workbuddy/skills"

# categories to include (exclude deprecated / in-progress / personal)
INCLUDE = ["engineering", "productivity", "misc"]

PREAMBLE = (
    "> 说明：本技能移植自 Matt Pocock skills 中文版（原 Claude Code 斜杠命令），"
    "已在 WorkBuddy 中按语义自动触发。原版中 `/xxx` 斜杠命令与 sub-agent 机制在此以等价方式处理。\n\n"
)

def parse_frontmatter(text):
    if not text.startswith("---"):
        return {}, text
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", text, re.S)
    if not m:
        return {}, text
    fm_raw, body = m.group(1), m.group(2)
    fm = {}
    for line in fm_raw.split("\n"):
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    return fm, body

def first_h1(body):
    for line in body.split("\n"):
        if line.startswith("# "):
            return line[2:].strip()
    return None

def to_block_scalar(s):
    # YAML folded block scalar, safe for Chinese + special chars
    return "  " + " ".join(s.split())

count = 0
for cat in INCLUDE:
    catdir = os.path.join(SRC, cat)
    if not os.path.isdir(catdir):
        continue
    for name in sorted(os.listdir(catdir)):
        src_skill = os.path.join(catdir, name)
        if not os.path.isdir(src_skill):
            continue
        skill_md = os.path.join(src_skill, "SKILL.md")
        if not os.path.isfile(skill_md):
            continue
        raw = open(skill_md, encoding="utf-8").read()
        fm, body = parse_frontmatter(raw)
        slug = fm.get("name") or name
        desc = fm.get("description") or (first_h1(body) or slug)
        h1 = first_h1(body) or slug
        out_dir = os.path.join(DEST, slug)
        os.makedirs(out_dir, exist_ok=True)
        # copy whole skill dir (preserve references like tests.md)
        for item in os.listdir(src_skill):
            s = os.path.join(src_skill, item)
            d = os.path.join(out_dir, item)
            if item == "SKILL.md":
                continue
            if os.path.isdir(s):
                shutil.copytree(s, d, dirs_exist_ok=True)
            else:
                shutil.copy2(s, d)
        # build WorkBuddy frontmatter
        new_fm = (
            "---\n"
            f"name: {slug}\n"
            "description: >-\n"
            f"{to_block_scalar(desc)}\n"
            "agent_created: true\n"
            "version: 1.0.0\n"
            f'display_name: "{h1}"\n'
            f'display_name_en: "{h1}"\n'
            f'description_zh: "{desc}"\n'
            f'description_en: "Ported from Matt Pocock skills (zh-CN): {h1}"\n'
            'visibility: "public"\n'
            "---\n\n"
        )
        new_body = PREAMBLE + body
        with open(os.path.join(out_dir, "SKILL.md"), "w", encoding="utf-8") as f:
            f.write(new_fm + new_body)
        count += 1
        print(f"  + {slug}  ({cat})  desc={len(desc)}ch")

print(f"\nDONE: {count} skills ported to {DEST}")
