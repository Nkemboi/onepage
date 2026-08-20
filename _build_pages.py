#!/usr/bin/env python3
from pathlib import Path

ROOT = Path("/home/user/onepage")


def page(title, description, root, page_id, hero_img, hero_alt, crumb, heading, lede, body, aside=""):
    return f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title} — TripsToKenya</title>
    <meta name="description" content="{description}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
    <link rel="icon" href="{root}images/logo.png" type="image/png" />
    <link rel="stylesheet" href="{root}styles.css" />
  </head>
  <body class="inner" data-root="{root}" data-page="{page_id}">
    <div class="cursor-glow" aria-hidden="true"></div>
    <div data-include="overlays"></div>
    <div data-include="header"></div>

    <section class="page-hero">
      <div class="page-hero-media" data-parallax="0.2">
        <img src="{root}{hero_img}" alt="{hero_alt}" />
      </div>
      <div class="page-hero-shade"></div>
      <div class="page-hero-copy">
        <p class="crumb">{crumb}</p>
        <h1>{heading}</h1>
        <p class="lede wide">{lede}</p>
      </div>
    </section>

    <main class="page-main">
      {body}
      {aside}
    </main>

    <div data-include="footer"></div>
    <script src="{root}site.js"></script>
  </body>
</html>
"""


def dest_body(intro, points, hotels, more):
    hotel_html = "\n".join(
        f"""          <a class="hotel-card" href="{href}">
            <img src="{img}" alt="{name}" />
            <div>
              <span>{place}</span>
              <h3>{name}</h3>
              <p>{blurb}</p>
            </div>
          </a>"""
        for href, img, place, name, blurb in hotels
    )
    more_html = "\n".join(
        f"""          <a class="place-card" href="{href}">
            <img src="{img}" alt="{name}" />
            <div>
              <span>{tag}</span>
              <h3>{name}</h3>
              <p>{blurb}</p>
            </div>
          </a>"""
        for href, img, tag, name, blurb in more
    )
    return f"""
      <div class="detail-layout">
        <article class="prose reveal-on">
          {intro}
          <ul>
            {points}
          </ul>
        </article>
        <aside class="detail-aside reveal-on">
          __ASIDE__
          <button class="btn btn-dark js-reserve" type="button">Plan this trip</button>
        </aside>
      </div>
      <div class="related">
        <h2>Best hotels nearby</h2>
        <div class="hotel-grid">{hotel_html}
        </div>
      </div>
      <div class="related">
        <h2>More destinations</h2>
        <div class="place-grid">{more_html}
        </div>
      </div>
    """


def aside_dl(rows):
    items = "\n".join(f"            <div><dt>{k}</dt><dd>{v}</dd></div>" for k, v in rows)
    return f"<dl>\n{items}\n          </dl>"


destinations = {
    "maasai-mara": dict(
        title="Maasai Mara",
        description="The great migration, big cats, and golden light on Kenya’s most famous plains.",
        img="images/mara-landscape.jpg",
        alt="Maasai Mara savanna",
        heading="Maasai Mara",
        lede="Open plains, the great migration, and lodges that look straight onto the corridor.",
        intro="""<h2>Kenya’s defining safari.</h2>
          <p>The Mara is where first-time guests understand why people come back. Wildebeest on the move from July to October, resident cats all year, and light that makes every evening feel like a film still.</p>
          <p>We time arrivals to river crossings when we can, and to quieter conservancies when you want space. Bush flights from Nairobi keep the road out of the story.</p>""",
        points="""<li>Great Migration window: July to October</li>
            <li>Resident big cats and excellent guiding year-round</li>
            <li>Escarpment sundowners and night skies with no city glow</li>""",
        meta=[("Region", "Narok"), ("Best time", "Jul – Oct"), ("Stay", "3–4 nights"), ("Perfect for", "First safari")],
        hotels=[
            ("../hotels/escarpment-camp.html", "../images/hotel-camp.jpg", "Maasai Mara", "Escarpment Camp", "Canvas suites and a deck on the plains."),
            ("../hotels/giraffe-manor.html", "../images/hotel-giraffe.jpg", "Nairobi", "Giraffe Manor", "The classic night before you fly to the Mara."),
        ],
        more=[
            ("amboseli.html", "../images/amboseli.jpg", "Elephants", "Amboseli", "Herds and Kilimanjaro at dawn."),
            ("diani.html", "../images/diani-beach.jpg", "Coast", "Diani Beach", "White sand after the dust."),
            ("lamu.html", "../images/hotel-lamu.jpg", "Culture", "Lamu", "Dhows and a slower rhythm."),
            ("nairobi.html", "../images/hotel-giraffe.jpg", "City", "Nairobi", "Arrival night done properly."),
        ],
    ),
    "amboseli": dict(
        title="Amboseli",
        description="Elephant herds beneath Kilimanjaro and some of Kenya’s clearest dawns.",
        img="images/amboseli.jpg",
        alt="Elephants in Amboseli with Kilimanjaro",
        heading="Amboseli",
        lede="Elephants in the foreground, Kilimanjaro in the sky — Kenya at its most graphic.",
        intro="""<h2>The mountain, and the herds.</h2>
          <p>Amboseli is short enough from Nairobi for families and first safaris, and photogenic enough that we still send photographers who have seen the rest of the country.</p>
          <p>Mornings are for the swamp edges and the mountain. Afternoons can be hot; we plan shade, a late game drive, and lodges that understand children.</p>""",
        points="""<li>Clear Kilimanjaro views most often from January to March</li>
            <li>Large, relaxed elephant families</li>
            <li>Easy pairing with Nairobi or a coast finale</li>""",
        meta=[("Region", "Kajiado"), ("Best time", "Jan – Mar"), ("Stay", "2–3 nights"), ("Perfect for", "Families")],
        hotels=[
            ("../hotels/giraffe-manor.html", "../images/hotel-giraffe.jpg", "Nairobi", "Giraffe Manor", "Start here, then drive or fly to Amboseli."),
            ("../hotels/escarpment-camp.html", "../images/hotel-camp.jpg", "Maasai Mara", "Escarpment Camp", "Add the Mara if you have a week."),
        ],
        more=[
            ("maasai-mara.html", "../images/mara-landscape.jpg", "Wildlife", "Maasai Mara", "The bigger plains, after Amboseli."),
            ("diani.html", "../images/diani-beach.jpg", "Coast", "Diani Beach", "Salt water after the dust."),
            ("nairobi.html", "../images/hotel-giraffe.jpg", "City", "Nairobi", "Where the circuit begins."),
            ("lamu.html", "../images/hotel-lamu.jpg", "Culture", "Lamu", "If you want the coast quieter."),
        ],
    ),
    "diani": dict(
        title="Diani Beach",
        description="White sand, the Indian Ocean, and villas made for long afternoons.",
        img="images/diani-beach.jpg",
        alt="Diani Beach villa and pool",
        heading="Diani Beach",
        lede="The south coast after safari — warm water, staffed villas, and very little to decide.",
        intro="""<h2>Where the dust comes off.</h2>
          <p>We put Diani at the end of almost every safari that can spare four days. The flight from the Mara or Nairobi is short. The ocean does the rest.</p>
          <p>Villas with cooks beat large resorts for the way our guests actually travel: late breakfasts, a snorkel, a nap, dinner on the terrace.</p>""",
        points="""<li>Best weather December to March and July to October</li>
            <li>Private villas with staff, or a handful of small lodges</li>
            <li>Reef snorkeling, kitesurf, and nothing-at-all</li>""",
        meta=[("Region", "Kwale"), ("Best time", "Dec – Mar"), ("Stay", "3–5 nights"), ("Perfect for", "Honeymoons")],
        hotels=[
            ("../hotels/peponi-house.html", "../images/hotel-lamu.jpg", "Lamu", "Peponi House", "If you want the coast slower and older."),
            ("../hotels/escarpment-camp.html", "../images/hotel-camp.jpg", "Maasai Mara", "Escarpment Camp", "The safari half of the same trip."),
        ],
        more=[
            ("lamu.html", "../images/hotel-lamu.jpg", "Culture", "Lamu", "Swahili island, no cars."),
            ("maasai-mara.html", "../images/mara-landscape.jpg", "Wildlife", "Maasai Mara", "Start here, then fly south."),
            ("amboseli.html", "../images/amboseli.jpg", "Elephants", "Amboseli", "A shorter safari first."),
            ("nairobi.html", "../images/hotel-giraffe.jpg", "City", "Nairobi", "In and out through JKIA."),
        ],
    ),
    "lamu": dict(
        title="Lamu",
        description="Dhows, coral-stone houses, and a slower Swahili rhythm.",
        img="images/hotel-lamu.jpg",
        alt="Lamu waterfront hotel",
        heading="Lamu",
        lede="No cars, carved doors, and evenings that move at the speed of a dhow.",
        intro="""<h2>The coast with a memory.</h2>
          <p>Lamu is for guests who have already done a beach and want culture with the salt. Donkeys in the lanes, a house with a roof terrace, and a cook who already knows the fisherman.</p>
          <p>We avoid the busiest festival weeks unless you ask for them, and we book houses we have stayed in — not listings.</p>""",
        points="""<li>Best from July to March, outside the long rains</li>
            <li>Houses and small hotels on Shela or the old town</li>
            <li>Dhow sunsets, empty beaches, Swahili kitchens</li>""",
        meta=[("Region", "Lamu Archipelago"), ("Best time", "Jul – Mar"), ("Stay", "4 nights"), ("Perfect for", "Slow travel")],
        hotels=[
            ("../hotels/peponi-house.html", "../images/hotel-lamu.jpg", "Lamu", "Peponi House", "Coral-stone rooms on the channel."),
            ("../hotels/giraffe-manor.html", "../images/hotel-giraffe.jpg", "Nairobi", "Giraffe Manor", "One night on the way in or out."),
        ],
        more=[
            ("diani.html", "../images/diani-beach.jpg", "Coast", "Diani Beach", "Easier beach, same ocean."),
            ("maasai-mara.html", "../images/mara-landscape.jpg", "Wildlife", "Maasai Mara", "Safari first, Lamu after."),
            ("amboseli.html", "../images/amboseli.jpg", "Elephants", "Amboseli", "A short bush chapter."),
            ("nairobi.html", "../images/hotel-giraffe.jpg", "City", "Nairobi", "The flight home starts here."),
        ],
    ),
    "nairobi": dict(
        title="Nairobi",
        description="The right arrival night — Giraffe Manor, the highlands, and a calm start to Kenya.",
        img="images/hotel-giraffe.jpg",
        alt="Giraffe Manor in Nairobi",
        heading="Nairobi",
        lede="Treat the city as a prologue, not a layover. One proper night changes the whole trip.",
        intro="""<h2>Start as you mean to go on.</h2>
          <p>Most guests land after dark. We do not send you into a conference hotel. Giraffe Manor, a highland house, or a quiet garden lodge — then a bush flight in the morning.</p>
          <p>If you have a spare day: the elephant orphanage, a coffee estate, or nothing but jet-lag and a good lunch.</p>""",
        points="""<li>One night is enough for most circuits</li>
            <li>Giraffe Manor books out months ahead — we hold rooms</li>
            <li>JKIA transfers and next-morning bush flights, arranged</li>""",
        meta=[("Region", "Nairobi"), ("Best time", "Year-round"), ("Stay", "1–2 nights"), ("Perfect for", "Arrivals")],
        hotels=[
            ("../hotels/giraffe-manor.html", "../images/hotel-giraffe.jpg", "Nairobi", "Giraffe Manor", "Breakfast with Rothschild giraffes."),
            ("../hotels/escarpment-camp.html", "../images/hotel-camp.jpg", "Maasai Mara", "Escarpment Camp", "Tomorrow’s bush flight."),
        ],
        more=[
            ("maasai-mara.html", "../images/mara-landscape.jpg", "Wildlife", "Maasai Mara", "The usual next stop."),
            ("amboseli.html", "../images/amboseli.jpg", "Elephants", "Amboseli", "The shorter road safari."),
            ("diani.html", "../images/diani-beach.jpg", "Coast", "Diani Beach", "Save it for the end."),
            ("lamu.html", "../images/hotel-lamu.jpg", "Culture", "Lamu", "A different kind of finale."),
        ],
    ),
}

hotels = {
    "giraffe-manor": dict(
        title="Giraffe Manor",
        description="A stone manor breakfast with Rothschild giraffes — the classic Nairobi opening night.",
        img="images/hotel-giraffe.jpg",
        alt="Giraffe Manor terrace",
        heading="Giraffe Manor",
        lede="The house that still surprises people who think they have seen everything.",
        intro="""<h2>Why we still book it.</h2>
          <p>Not because it is famous. Because the morning is genuinely strange and gentle — a giraffe at the sash window, good coffee, and a garden that feels like the highlands, not a city.</p>
          <p>We use it as night one. You land, you sleep, you have breakfast, you fly to the Mara. The rest of Kenya makes more sense after that.</p>""",
        points="""<li>One night is the right dose</li>
            <li>Book six to nine months ahead for high season</li>
            <li>Pairs with Amboseli or a next-day Mara flight</li>""",
        meta=[("Where", "Nairobi"), ("Rooms", "Manor suites"), ("Best for", "Opening night"), ("From", "On request")],
        related_hotels=[
            ("escarpment-camp.html", "../images/hotel-camp.jpg", "Maasai Mara", "Escarpment Camp", "The safari that follows."),
            ("peponi-house.html", "../images/hotel-lamu.jpg", "Lamu", "Peponi House", "A coast ending, later."),
        ],
        related_dest=[
            ("../destinations/nairobi.html", "../images/hotel-giraffe.jpg", "City", "Nairobi", "Treat the arrival as part of the trip."),
            ("../destinations/maasai-mara.html", "../images/mara-landscape.jpg", "Wildlife", "Maasai Mara", "Fly out after breakfast."),
            ("../destinations/amboseli.html", "../images/amboseli.jpg", "Elephants", "Amboseli", "Or take the road south."),
        ],
    ),
    "escarpment-camp": dict(
        title="Escarpment Camp",
        description="Canvas suites, brass lanterns, and a deck that looks onto the Maasai Mara.",
        img="images/hotel-camp.jpg",
        alt="Luxury tented camp",
        heading="Escarpment Camp",
        lede="Close enough to the migration to hear it. Quiet enough to sleep after.",
        intro="""<h2>A proper tented camp.</h2>
          <p>Canvas, teak, a plunge on the deck, and a mess tent that still feels like camp. We send people here when they want the Mara without a resort footprint.</p>
          <p>Guides are the reason. We know who is on which rotation, and we match them to families, photographers, or first-timers.</p>""",
        points="""<li>Three nights minimum in migration season</li>
            <li>Private vehicle available on every booking we make</li>
            <li>Bush breakfasts and sundowners on the escarpment</li>""",
        meta=[("Where", "Maasai Mara"), ("Rooms", "12 suites"), ("Best for", "Safari"), ("From", "On request")],
        related_hotels=[
            ("giraffe-manor.html", "../images/hotel-giraffe.jpg", "Nairobi", "Giraffe Manor", "The night before you fly in."),
            ("peponi-house.html", "../images/hotel-lamu.jpg", "Lamu", "Peponi House", "Or end on the old coast."),
        ],
        related_dest=[
            ("../destinations/maasai-mara.html", "../images/mara-landscape.jpg", "Wildlife", "Maasai Mara", "This is the camp’s whole reason."),
            ("../destinations/diani.html", "../images/diani-beach.jpg", "Coast", "Diani Beach", "Four days of salt after the dust."),
            ("../destinations/amboseli.html", "../images/amboseli.jpg", "Elephants", "Amboseli", "A second park if you have time."),
        ],
    ),
    "peponi-house": dict(
        title="Peponi House",
        description="Coral-stone rooms, carved doors, and dhow sunsets on the Lamu channel.",
        img="images/hotel-lamu.jpg",
        alt="Peponi House Lamu",
        heading="Peponi House",
        lede="A Swahili house that behaves like a small hotel — and knows when to leave you alone.",
        intro="""<h2>Lamu, done simply.</h2>
          <p>White coral walls, a roof for the evening, and a kitchen that buys from the boats. We book it for guests who want the archipelago without a compound.</p>
          <p>Days are empty on purpose. A dhow if you ask. Shela beach if you walk. Nothing if you don’t.</p>""",
        points="""<li>Four nights lets the island land</li>
            <li>Best rooms face the channel</li>
            <li>Easy after Nairobi; pair with safari only if you have 10+ days</li>""",
        meta=[("Where", "Lamu"), ("Rooms", "Boutique"), ("Best for", "Slow coast"), ("From", "On request")],
        related_hotels=[
            ("giraffe-manor.html", "../images/hotel-giraffe.jpg", "Nairobi", "Giraffe Manor", "One night on the way through."),
            ("escarpment-camp.html", "../images/hotel-camp.jpg", "Maasai Mara", "Escarpment Camp", "Safari first, if the trip is long."),
        ],
        related_dest=[
            ("../destinations/lamu.html", "../images/hotel-lamu.jpg", "Culture", "Lamu", "The island around the house."),
            ("../destinations/diani.html", "../images/diani-beach.jpg", "Coast", "Diani Beach", "A different, easier beach."),
            ("../destinations/nairobi.html", "../images/hotel-giraffe.jpg", "City", "Nairobi", "The flight home."),
        ],
    ),
}


def write(path, html):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")
    print("wrote", path.relative_to(ROOT))


# Destination detail pages
for slug, d in destinations.items():
    body = dest_body(d["intro"], d["points"], d["hotels"], d["more"]).replace("__ASIDE__", aside_dl(d["meta"]))
    html = page(
        d["title"],
        d["description"],
        "../",
        "destinations",
        d["img"],
        d["alt"],
        f'<a href="../destinations.html">Destinations</a> <span>/</span> {d["title"]}',
        d["heading"],
        d["lede"],
        body,
    )
    write(ROOT / "destinations" / f"{slug}.html", html)

# Hotel detail pages
for slug, d in hotels.items():
    body = dest_body(d["intro"], d["points"], d["related_hotels"], d["related_dest"]).replace(
        "__ASIDE__", aside_dl(d["meta"])
    )
    # tweak heading of related blocks for hotels
    body = body.replace("Best hotels nearby", "Also booked on this route").replace("More destinations", "Go with this stay")
    html = page(
        d["title"],
        d["description"],
        "../",
        "hotels",
        d["img"],
        d["alt"],
        f'<a href="../hotels.html">Hotels</a> <span>/</span> {d["title"]}',
        d["heading"],
        d["lede"],
        body,
    )
    write(ROOT / "hotels" / f"{slug}.html", html)

# Listing: destinations
dest_cards = """
      <div class="catalog">
        <div class="place-grid">
          <a class="place-card reveal-on" href="destinations/maasai-mara.html">
            <img src="images/mara-landscape.jpg" alt="Maasai Mara" />
            <div><span>Wildlife</span><h3>Maasai Mara</h3><p>The great migration and Kenya’s most famous plains.</p></div>
          </a>
          <a class="place-card reveal-on" href="destinations/amboseli.html">
            <img src="images/amboseli.jpg" alt="Amboseli" />
            <div><span>Elephants</span><h3>Amboseli</h3><p>Herds beneath Kilimanjaro and clear highland dawns.</p></div>
          </a>
          <a class="place-card reveal-on" href="destinations/diani.html">
            <img src="images/diani-beach.jpg" alt="Diani" />
            <div><span>Coast</span><h3>Diani Beach</h3><p>White sand and villas after the safari dust.</p></div>
          </a>
          <a class="place-card reveal-on" href="destinations/lamu.html">
            <img src="images/hotel-lamu.jpg" alt="Lamu" />
            <div><span>Culture</span><h3>Lamu</h3><p>Dhows, coral stone, and a slower Swahili week.</p></div>
          </a>
        </div>
      </div>
"""
write(
    ROOT / "destinations.html",
    page(
        "Destinations",
        "Ideal Kenyan locations curated by TripsToKenya — Mara, Amboseli, Diani, and Lamu.",
        "",
        "destinations",
        "images/mara-landscape.jpg",
        "Kenyan savanna",
        '<a href="index.html">Home</a> <span>/</span> Destinations',
        "Ideal locations",
        "The agent matches season, pace, and who you are traveling with — then we send you to places we actually know.",
        dest_cards,
    ),
)

hotel_cards = """
      <div class="catalog">
        <div class="hotel-grid">
          <a class="hotel-card reveal-on" href="hotels/giraffe-manor.html">
            <img src="images/hotel-giraffe.jpg" alt="Giraffe Manor" />
            <div><span>Nairobi</span><h3>Giraffe Manor</h3><p>Breakfast with Rothschild giraffes before the bush flight.</p></div>
          </a>
          <a class="hotel-card reveal-on" href="hotels/escarpment-camp.html">
            <img src="images/hotel-camp.jpg" alt="Escarpment Camp" />
            <div><span>Maasai Mara</span><h3>Escarpment Camp</h3><p>Canvas suites and a deck on the migration plains.</p></div>
          </a>
          <a class="hotel-card reveal-on" href="hotels/peponi-house.html">
            <img src="images/hotel-lamu.jpg" alt="Peponi House" />
            <div><span>Lamu</span><h3>Peponi House</h3><p>Coral-stone rooms and dhow sunsets on the channel.</p></div>
          </a>
        </div>
      </div>
"""
write(
    ROOT / "hotels.html",
    page(
        "Hotels",
        "The best hotels and lodges TripsToKenya actually books in Kenya.",
        "",
        "hotels",
        "images/hotel-camp.jpg",
        "Safari camp",
        '<a href="index.html">Home</a> <span>/</span> Hotels',
        "Best hotels",
        "Not a directory. Rooms we hold because they match the route — manor, camp, and Swahili house.",
        hotel_cards,
    ),
)

editors_body = """
      <div class="detail-layout">
        <article class="prose reveal-on">
          <h2>The Memory Circuit</h2>
          <p>Three nights on the Mara escarpment, one night at Giraffe Manor, then four slow days on Diani. Private guide, bush flights, and nothing you have to arrange twice.</p>
          <p>This is the trip we book for ourselves when a friend asks for Kenya and has ten days. It is not the cheapest sequence. It is the one people remember in order.</p>
          <div class="itinerary">
            <article>
              <h3>Night 1 — Nairobi</h3>
              <p>Land, transfer, Giraffe Manor. Sleep. Breakfast with the herd, then a bush flight.</p>
            </article>
            <article>
              <h3>Nights 2–4 — Maasai Mara</h3>
              <p>Escarpment Camp, private vehicle, sundowners. Migration if the month is right; cats if it isn’t.</p>
            </article>
            <article>
              <h3>Nights 5–8 — Diani</h3>
              <p>A staffed villa, the Indian Ocean, and a cook who already has your coffee order.</p>
            </article>
          </div>
        </article>
        <aside class="detail-aside reveal-on">
          <dl>
            <div><dt>Length</dt><dd>8–9 nights</dd></div>
            <div><dt>Best months</dt><dd>Jul – Oct</dd></div>
            <div><dt>Style</dt><dd>Safari + coast</dd></div>
            <div><dt>Pace</dt><dd>Unhurried</dd></div>
          </dl>
          <button class="btn btn-dark js-reserve" type="button">Plan this route</button>
        </aside>
      </div>
"""
write(
    ROOT / "editors.html",
    page(
        "Editor’s Choice",
        "The Memory Circuit — the Kenya route TripsToKenya books for itself.",
        "",
        "editors",
        "images/hero-kenya.jpg",
        "Safari lodge at sunset",
        '<a href="index.html">Home</a> <span>/</span> Editor’s Choice',
        "Editor’s Choice",
        "The circuit we book for ourselves: manor, Mara, and the Indian Ocean, in that order.",
        editors_body,
    ),
)

story_body = """
      <div class="detail-layout">
        <article class="prose reveal-on">
          <h2>An AI travel agent, with taste.</h2>
          <p>TripsToKenya exists because most Kenya trips are assembled from lists. We curate instead: ideal locations, the hotels we actually send people to, and an editor’s sequence so each place has time to land.</p>
          <p>The agent handles the questions — dates, children, first safari or fifth. Editors and local fixers handle the rooms, the guides, and the bush flights. You get a country that feels inevitable, not booked.</p>
          <h2>How a trip gets made</h2>
          <ul>
            <li>You tell the agent where the memory should live.</li>
            <li>We match season to park, and park to the right lodge.</li>
            <li>A human editor checks the route before anything is held.</li>
          </ul>
        </article>
        <aside class="detail-aside reveal-on">
          <dl>
            <div><dt>Based</dt><dd>Nairobi</dd></div>
            <div><dt>Since</dt><dd>2024</dd></div>
            <div><dt>Focus</dt><dd>Kenya only</dd></div>
          </dl>
          <button class="btn btn-dark js-reserve" type="button">Start a trip</button>
        </aside>
      </div>
"""
write(
    ROOT / "story.html",
    page(
        "Our Story",
        "TripsToKenya is an AI travel agent for Kenyan destinations that leave unforgettable memories.",
        "",
        "story",
        "images/safari-guest.jpg",
        "Guest on safari",
        '<a href="index.html">Home</a> <span>/</span> Our Story',
        "Our Story",
        "Destinations that inspire — planned so you remember Kenya, not the logistics.",
        story_body,
    ),
)

contact_body = """
      <div class="detail-layout">
        <article class="prose reveal-on">
          <h2>Talk to the desk.</h2>
          <p>For new trips, use Plan Your Trip and the agent will start the route. For a booking you already have, write to the desk and a person answers.</p>
          <ul>
            <li>Email — hello@tripstokenya.com</li>
            <li>WhatsApp — +254 700 000 000</li>
            <li>Hours — 8:00–20:00 EAT, seven days</li>
          </ul>
          <h2>Booking, cancellation, privacy</h2>
          <p>Lodges are held on the property’s own terms. We confirm those in writing before you pay. Cancellations follow the lodge window; we will always say so before you commit.</p>
          <p>We keep only what we need to plan your trip. We do not sell your details. Cookie use on this site is limited to making the pages work.</p>
        </article>
        <aside class="detail-aside reveal-on">
          <dl>
            <div><dt>Desk</dt><dd>Nairobi</dd></div>
            <div><dt>Reply</dt><dd>Same day</dd></div>
          </dl>
          <button class="btn btn-dark js-reserve" type="button">Plan Your Trip</button>
        </aside>
      </div>
"""
write(
    ROOT / "contact.html",
    page(
        "Contact",
        "Contact the TripsToKenya desk for bookings, help, and trip changes.",
        "",
        "contact",
        "images/savanna-sunset.jpg",
        "Kenyan sunset",
        '<a href="index.html">Home</a> <span>/</span> Contact',
        "Help & contact",
        "A person on the other end — after the agent has sketched the route.",
        contact_body,
    ),
)

print("done")
