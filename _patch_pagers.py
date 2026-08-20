#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path("/home/user/onepage")

DEST = [
    ("maasai-mara", "Maasai Mara", "../images/mara-landscape.jpg"),
    ("amboseli", "Amboseli", "../images/amboseli.jpg"),
    ("diani", "Diani Beach", "../images/diani-beach.jpg"),
    ("lamu", "Lamu", "../images/hotel-lamu.jpg"),
    ("nairobi", "Nairobi", "../images/hotel-giraffe.jpg"),
]
HOTELS = [
    ("giraffe-manor", "Giraffe Manor", "../images/hotel-giraffe.jpg"),
    ("escarpment-camp", "Escarpment Camp", "../images/hotel-camp.jpg"),
    ("peponi-house", "Peponi House", "../images/hotel-lamu.jpg"),
]


def pager(items, slug, href):
    i = next(n for n, (s, _, _) in enumerate(items) if s == slug)
    prev_s, prev_t, prev_img = items[i - 1]
    next_s, next_t, next_img = items[(i + 1) % len(items)]
    return f"""      <nav class="pager">
        <a class="pager-link prev" href="{href(prev_s)}">
          <img class="pager-thumb" src="{prev_img}" alt="" />
          <span class="pager-copy">
            <span>Previous</span>
            <strong>{prev_t}</strong>
          </span>
        </a>
        <a class="pager-link next" href="{href(next_s)}">
          <span class="pager-copy">
            <span>Next</span>
            <strong>{next_t}</strong>
          </span>
          <img class="pager-thumb" src="{next_img}" alt="" />
        </a>
      </nav>
"""


PAGER_RE = re.compile(r'<nav class="pager">[\s\S]*?</nav>', re.M)


def replace_pager(path: Path, html_block: str):
    text = path.read_text()
    if not PAGER_RE.search(text):
        raise SystemExit(f"no pager in {path}")
    path.write_text(PAGER_RE.sub(html_block.strip(), text, count=1))
    print("patched", path.name)


for slug, _, _ in DEST:
    replace_pager(
        ROOT / "destinations" / f"{slug}.html",
        pager(DEST, slug, lambda s: f"{s}.html"),
    )

for slug, _, _ in HOTELS:
    replace_pager(
        ROOT / "hotels" / f"{slug}.html",
        pager(HOTELS, slug, lambda s: f"{s}.html"),
    )
