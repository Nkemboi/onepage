#!/usr/bin/env python3
from pathlib import Path

ROOT = Path("/home/user/onepage")

DEST = [
    ("maasai-mara", "Maasai Mara"),
    ("amboseli", "Amboseli"),
    ("diani", "Diani Beach"),
    ("lamu", "Lamu"),
    ("nairobi", "Nairobi"),
]
HOTELS = [
    ("giraffe-manor", "Giraffe Manor"),
    ("escarpment-camp", "Escarpment Camp"),
    ("peponi-house", "Peponi House"),
]


def pager(items, slug, href):
    i = next(n for n, (s, _) in enumerate(items) if s == slug)
    prev_s, prev_t = items[i - 1]
    next_s, next_t = items[(i + 1) % len(items)]
    return f"""      <nav class="pager">
        <a class="pager-link prev" href="{href(prev_s)}">
          <span>Previous</span>
          <strong>{prev_t}</strong>
        </a>
        <a class="pager-link next" href="{href(next_s)}">
          <span>Next</span>
          <strong>{next_t}</strong>
        </a>
      </nav>
"""


def strip_related(html: str) -> str:
    start = html.find('      <div class="related">')
    if start == -1:
        return html
    end = html.find("    </main>", start)
    return html[:start] + "PLACEHOLDER\n    </main>" + html[end + len("    </main>") :]


for slug, _ in DEST:
    path = ROOT / "destinations" / f"{slug}.html"
    html = path.read_text()
    html = strip_related(html).replace(
        "PLACEHOLDER", pager(DEST, slug, lambda s: f"{s}.html")
    )
    path.write_text(html)
    print("patched", path.name)

for slug, _ in HOTELS:
    path = ROOT / "hotels" / f"{slug}.html"
    html = path.read_text()
    html = strip_related(html).replace(
        "PLACEHOLDER", pager(HOTELS, slug, lambda s: f"{s}.html")
    )
    path.write_text(html)
    print("patched", path.name)
