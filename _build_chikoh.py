#!/usr/bin/env python3
from pathlib import Path

ROOT = Path("/home/user/onepage")


def page(title, description, page_id, hero_img, hero_alt, crumb, heading, lede, body):
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
    <link rel="icon" href="images/logo.png" type="image/png" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="inner" data-root="" data-page="{page_id}">
    <div class="cursor-glow" aria-hidden="true"></div>
    <div data-include="overlays"></div>
    <div data-include="header"></div>

    <section class="page-hero">
      <div class="page-hero-media" data-parallax="0.2">
        <img src="{hero_img}" alt="{hero_alt}" />
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
    </main>

    <div data-include="footer"></div>
    <script src="site.js"></script>
  </body>
</html>
"""


def cards(items, prefix):
    out = ['<div class="catalog-host">', '  <div class="place-grid catalog">']
    sheets = []
    for i, item in enumerate(items):
        prev_item = items[i - 1]
        next_item = items[(i + 1) % len(items)]
        out.append(
            f'''    <button class="place-card" type="button" data-open-panel="panel-{item["id"]}">
      <img src="{item["img"]}" alt="{item["title"]}" />
      <div>
        <span>{item["tag"]}</span>
        <h3>{item["title"]}</h3>
        <p>{item["blurb"]}</p>
      </div>
    </button>'''
        )
        points = "".join(f"<li>{p}</li>" for p in item.get("points", []))
        sheets.append(
            f'''  <article class="sheet" id="panel-{item["id"]}">
    <button class="sheet-back" type="button" data-close-panel>← All {prefix}</button>
    <div class="sheet-grid">
      <img src="{item["img"]}" alt="{item["title"]}" />
      <div class="prose">
        <p class="eyebrow light">{item["tag"]}</p>
        <h2>{item["title"]}</h2>
        <p>{item["body"]}</p>
        <ul>{points}</ul>
        <button class="btn btn-dark js-reserve" type="button">Enquire</button>
      </div>
    </div>
    <nav class="pager">
      <button class="pager-link prev" type="button" data-open-panel="panel-{prev_item["id"]}">
        <img class="pager-thumb" src="{prev_item["img"]}" alt="" />
        <span class="pager-copy">
          <span>Previous</span>
          <strong>{prev_item["title"]}</strong>
        </span>
      </button>
      <button class="pager-link next" type="button" data-open-panel="panel-{next_item["id"]}">
        <span class="pager-copy">
          <span>Next</span>
          <strong>{next_item["title"]}</strong>
        </span>
        <img class="pager-thumb" src="{next_item["img"]}" alt="" />
      </button>
    </nav>
  </article>'''
        )
    out.append("  </div>")
    out.extend(sheets)
    out.append("</div>")
    return "\n".join(out)


packages = [
    {
        "id": "tsavo-1",
        "tag": "1 day",
        "title": "1 Day Tsavo East",
        "blurb": "A full day in Tsavo East with a pop-top game drive and picnic.",
        "img": "images/chikoh/tsavo-lodge.jpg",
        "body": "Leave the coast or Voi in the morning and spend the day in Tsavo East — red earth, elephant herds, and the Galana river country. Unmatched service, expert guides, and a commitment to excellence.",
        "points": ["Park fees and guide included in the enquiry", "Picnic lunch in the park", "Return transfer to your hotel or lodge"],
    },
    {
        "id": "tsavo-2",
        "tag": "2 days",
        "title": "2 Day Tsavo East & West",
        "blurb": "Sleep in the park. East one day, West the next.",
        "img": "images/chikoh/kilaguni.jpg",
        "body": "Cross from Tsavo East into Tsavo West. One night at Voi, Ngulia or Kilaguni, two game drives, and the contrast of red dust and volcanic hills.",
        "points": ["Overnight in a Tsavo lodge", "East and West game drives", "Airport or hotel pickup"],
    },
    {
        "id": "tsavo-3",
        "tag": "3 days",
        "title": "3 Day Tsavo East & West",
        "blurb": "Time enough for Salt Lick, Mzima Springs, and a slow drive.",
        "img": "images/chikoh/saltlick.jpg",
        "body": "Three days lets the parks land. We add Mzima Springs or a night at Salt Lick, where the waterhole sits under the rooms.",
        "points": ["Two nights in Tsavo lodges", "Optional Salt Lick night", "In-park transport throughout"],
    },
    {
        "id": "amboseli-ew",
        "tag": "Amboseli",
        "title": "East & West Amboseli",
        "blurb": "Elephants and Kilimanjaro, with time on both sides of the park.",
        "img": "images/amboseli.jpg",
        "body": "Amboseli’s swamps and the mountain. We run the east and west circuits so you see herds in the morning and the peak when the cloud lifts.",
        "points": ["Kilimanjaro viewpoints", "Elephant families on the swamp edge", "Lodge or camp inside or on the boundary"],
    },
    {
        "id": "mara-nakuru",
        "tag": "4 days",
        "title": "Nairobi, Maasai Mara & Nakuru",
        "blurb": "The classic highland loop — city, plains, and the soda lake.",
        "img": "images/mara-landscape.jpg",
        "body": "Four days from Nairobi: the Mara for cats and open grass, Lake Nakuru for rhino and flamingos, then home. Built for first-time Kenya.",
        "points": ["Nairobi start and finish", "Maasai Mara game drives", "Lake Nakuru National Park"],
    },
    {
        "id": "grand-7",
        "tag": "7 days",
        "title": "Tsavo, Amboseli, Nairobi, Mara & Nakuru",
        "blurb": "The long Chikoh circuit across Kenya’s great parks.",
        "img": "images/hero-kenya.jpg",
        "body": "Seven days linking Tsavo East, Amboseli, Nairobi, the Maasai Mara and Nakuru. The package we run when someone wants the country, not a weekend.",
        "points": ["Tsavo East and Amboseli", "Nairobi night", "Maasai Mara and Nakuru"],
    },
]

activities = [
    {
        "id": "snorkel",
        "tag": "Mombasa",
        "title": "Snorkel with the dolphins",
        "blurb": "Coral reefs, marine life, then the beach and Swahili lunch.",
        "img": "images/chikoh/snorkel.jpg",
        "body": "Snorkel with the dolphins and explore vibrant marine life. Discover the coral reefs and unforgettable underwater scenery. Afterward, relax on the beaches or indulge in local cuisine.",
        "points": ["Reef snorkeling", "Boat from the Mombasa / Diani coast", "Optional lunch on shore"],
    },
    {
        "id": "haller",
        "tag": "Mombasa",
        "title": "Haller Park",
        "blurb": "Giraffes, hippos and a working conservation story.",
        "img": "images/chikoh/haller.jpg",
        "body": "Interact with giraffes, hippos and other wildlife in Haller Park. A guided tour covers the conservation work, lush trails, and the animals that now live on the old quarry.",
        "points": ["Guided walk", "Giraffe and hippo viewing", "Easy half-day from town"],
    },
    {
        "id": "food",
        "tag": "Mombasa",
        "title": "Cuisine treasures of Mombasa",
        "blurb": "Samosas, coconut rice, and the spice of the coast.",
        "img": "images/diani-beach.jpg",
        "body": "Experience the culinary delights of Mombasa — rich spices, fresh ingredients, street food from samosas to coconut rice, and the culture that sits behind every plate.",
        "points": ["Old Town and street food", "Swahili lunch or dinner", "Market walk"],
    },
    {
        "id": "fort",
        "tag": "Mombasa",
        "title": "Fort Jesus Museum",
        "blurb": "The Portuguese fort and the story of the coast.",
        "img": "images/chikoh/fortjesus.jpg",
        "body": "Fort Jesus, in Mombasa, is a repository of coastal history. Artifacts, coral-stone architecture, and guided tours that go into the stories of the port.",
        "points": ["UNESCO fort", "Guided museum visit", "Old Town on the same morning"],
    },
    {
        "id": "nguuni",
        "tag": "Mombasa",
        "title": "Nguuni Nature Sanctuary",
        "blurb": "Quiet wildlife and birdlife just outside the city.",
        "img": "images/chikoh/haller.jpg",
        "body": "Peaceful wildlife encounters at Nguuni Nature Sanctuary. Walking trails, giraffes, and birds in a sanctuary that still feels like bush, not a zoo.",
        "points": ["Walking trails", "Birding", "Half-day from Mombasa"],
    },
    {
        "id": "kili",
        "tag": "6 nights",
        "title": "Scaling Mount Kilimanjaro",
        "blurb": "A six-night climb — views, ecosystems, and the summit attempt.",
        "img": "images/amboseli.jpg",
        "body": "A 6-night adventure on Mount Kilimanjaro. Breathtaking views, diverse ecosystems, and the chance to stand on the roof of Africa with a team we trust.",
        "points": ["Six nights on the mountain", "Porters and guides arranged", "Pairs with Amboseli before or after"],
    },
    {
        "id": "diani",
        "tag": "Coast",
        "title": "Visit to Diani Beach",
        "blurb": "Turquoise water, white sand, and a slower afternoon.",
        "img": "images/diani-beach.jpg",
        "body": "Diani Beach — turquoise ocean, soft white sand, water sports, shoreline food, and the local culture of the south coast.",
        "points": ["Beach day or overnight", "Water sports on request", "Easy after Tsavo"],
    },
    {
        "id": "boats",
        "tag": "Coast",
        "title": "Boat trips & jet skis",
        "blurb": "Glass-bottom boat, then jet ski if you want the speed.",
        "img": "images/chikoh/boats.jpg",
        "body": "A glass-bottom boat over the reef, and jet skiing for an additional fee. Coastline views, marine life under the hull, coves and coral.",
        "points": ["Glass-bottom boat", "Optional jet ski", "Half-day from Diani or Mombasa"],
    },
    {
        "id": "jambo",
        "tag": "Mombasa",
        "title": "Art gallery & Jambo Beach",
        "blurb": "Local art, then music and a bonfire on the sand.",
        "img": "images/chikoh/fortjesus.jpg",
        "body": "The Mombasa Art Gallery for local work, then Jambo Beach for live music and bonfires. A stroll on the shore when the air cools.",
        "points": ["Gallery visit", "Evening on the beach", "Best as a city night"],
    },
]

lodges = [
    {
        "id": "voi-safari",
        "tag": "Tsavo East",
        "title": "Voi Safari Lodge",
        "blurb": "On the edge of Tsavo East — elephants in the riverbed below.",
        "img": "images/chikoh/tsavo-lodge.jpg",
        "body": "Forget the ordinary safari. At Voi you don’t just visit Tsavo East — you live on its edge. A front-row seat where elephants dust-bathe in a riverbed below the balcony and the calls of the wild are the evening soundtrack.",
        "points": ["Boundary of Tsavo East", "Waterhole and riverbed views", "Accessible luxury, untamed bush"],
    },
    {
        "id": "voi-wildlife",
        "tag": "Tsavo East",
        "title": "Voi Wildlife Lodge",
        "blurb": "The sister stay — same wilderness, a different terrace.",
        "img": "images/chikoh/tsavo-lodge.jpg",
        "body": "Voi Wildlife Lodge sits on the same Tsavo East boundary. A luxurious basecamp designed to immerse you in raw Tsavo without giving up comfort.",
        "points": ["Tsavo East boundary", "Game drives from the door", "Pairs with a West night"],
    },
    {
        "id": "lion",
        "tag": "Tsavo East",
        "title": "Lion Lodge",
        "blurb": "A smaller Tsavo East camp for guests who want the park close.",
        "img": "images/chikoh/suv.jpg",
        "body": "Lion Lodge is the simpler East option we use when the route wants a night inside Tsavo without a large property. Close to the road, closer to the cats.",
        "points": ["Tsavo East", "Good for 1–2 night packages", "Game drives arranged"],
    },
    {
        "id": "boma",
        "tag": "Tsavo East",
        "title": "Boma Safari Lodge",
        "blurb": "A boma-style lodge for families and groups on the East circuit.",
        "img": "images/chikoh/minivan.jpg",
        "body": "Boma Safari Lodge works for families and small groups: rooms around a courtyard, easy meals, and a short run into the park at first light.",
        "points": ["Family rooms", "Tsavo East access", "Group-friendly"],
    },
    {
        "id": "ngulia",
        "tag": "Tsavo West",
        "title": "Ngulia Safari Lodge",
        "blurb": "Rhino country. A classic West lodge on the escarpment.",
        "img": "images/chikoh/kilaguni.jpg",
        "body": "Ngulia sits in Tsavo West’s rhino country. Night floodlights on the waterhole, and the hills behind. We use it on the two- and three-day East–West packages.",
        "points": ["Tsavo West", "Rhino sanctuary nearby", "Waterhole at night"],
    },
    {
        "id": "kilaguni",
        "tag": "Tsavo West",
        "title": "Kilaguni Lodge",
        "blurb": "The original park lodge — waterhole, Chyulu views, history.",
        "img": "images/chikoh/kilaguni.jpg",
        "body": "Kilaguni is one of Kenya’s original park lodges. Breakfast looking at a waterhole, Chyulu Hills on the skyline, and Mzima Springs a short drive away.",
        "points": ["Historic Tsavo West lodge", "Mzima Springs nearby", "Waterhole dining"],
    },
    {
        "id": "saltlick",
        "tag": "Tsavo West",
        "title": "Salt Lick Safari Lodge",
        "blurb": "Rooms on stilts. Wildlife under the floorboards.",
        "img": "images/chikoh/saltlick.jpg",
        "body": "At Salt Lick the line between observer and observed disappears. Perched on stilts above the Taita Hills sanctuary, the lodge sits over natural waterholes and salt licks. Wildlife roams under the rooms, day and night.",
        "points": ["Iconic stilted rooms", "Waterholes and salt licks", "Taita Hills Wildlife Sanctuary"],
    },
]

transport = [
    {
        "id": "suv",
        "tag": "Self or guided",
        "title": "4x4 SUVs",
        "blurb": "Urban tarmac and Tsavo tracks in the same vehicle.",
        "img": "images/chikoh/suv.jpg",
        "body": "Premium 4x4 SUVs for Kenya’s mixed roads — town in the morning, off-road by lunch. Comfort and safety, at your own pace or with a driver-guide.",
        "points": ["Airport pickup", "Park-ready vehicles", "Driver-guide on request"],
    },
    {
        "id": "van",
        "tag": "Groups",
        "title": "Minivans for groups",
        "blurb": "Pop-top vans for families and friends who want to share the view.",
        "img": "images/chikoh/minivan.jpg",
        "body": "Spacious safari minivans for group outings. Room for people and bags, pop-up roofs for the parks, and modern comfort on the long tarmac stretches.",
        "points": ["Families and friends", "Luggage space", "In-park game viewing"],
    },
    {
        "id": "guide",
        "tag": "Private",
        "title": "Personalised tour with a guide",
        "blurb": "A guide, a comfortable car, and a day built around you.",
        "img": "images/safari-guest.jpg",
        "body": "For guests who want the day designed: a guide, a sedan or 4x4, city or park, corporate or leisure. Exceptional service and a seamless ride.",
        "points": ["Private guide", "Flexible itinerary", "City or safari"],
    },
    {
        "id": "airport",
        "tag": "Transfers",
        "title": "Airport transfers",
        "blurb": "JKIA, Wilson, Moi International — met, and taken where you sleep.",
        "img": "images/chikoh/suv.jpg",
        "body": "Seamless airport transfers so the trip starts when you land, not when you find a taxi. Nairobi and Mombasa, day or night.",
        "points": ["JKIA and Wilson", "Moi International, Mombasa", "Lodge or hotel drop"],
    },
    {
        "id": "gamedrive",
        "tag": "In-park",
        "title": "In-park game drives",
        "blurb": "Pop-top vehicles and a guide who knows Tsavo and the coast parks.",
        "img": "images/chikoh/suv.jpg",
        "body": "In-drive gaming in the parks — shared or private. You watch; we handle the gates, the tracks, and the timing.",
        "points": ["Tsavo East and West", "Amboseli and the coast", "Morning and afternoon slots"],
    },
]


def write(name, html):
    path = ROOT / name
    path.write_text(html, encoding="utf-8")
    print("wrote", name)


write(
    "packages.html",
    page(
        "Packages",
        "Chikoh safari packages — Tsavo, Amboseli, Maasai Mara and Nakuru. No prices on the page; enquire and we quote.",
        "packages",
        "images/chikoh/tsavo-lodge.jpg",
        "Tsavo safari",
        '<a href="index.html">Home</a> <span>/</span> Packages',
        "Packages we run",
        "Unmatched service, expert guides, and a commitment to excellence. Open any package in this window — nothing reloads.",
        cards(packages, "packages"),
    ),
)

write(
    "activities.html",
    page(
        "Activities",
        "Things to do in Mombasa and beyond with Kenya Chikoh Safaris — snorkel, Haller Park, Fort Jesus, Diani, Kilimanjaro.",
        "activities",
        "images/chikoh/snorkel.jpg",
        "Snorkeling off the Kenyan coast",
        '<a href="index.html">Home</a> <span>/</span> Activities',
        "Activities to do",
        "Stay close to the wild and enjoy nature’s beauty — Mombasa, Diani, and a Kilimanjaro week. Tap a card; the story opens here.",
        cards(activities, "activities"),
    ),
)

write(
    "lodges.html",
    page(
        "Lodges",
        "Tsavo East and West lodges booked by Kenya Chikoh Safaris — Voi, Lion, Boma, Ngulia, Kilaguni and Salt Lick.",
        "lodges",
        "images/chikoh/saltlick.jpg",
        "Salt Lick Safari Lodge",
        '<a href="index.html">Home</a> <span>/</span> Lodges',
        "Diverse accommodations",
        "Hotels and lodges from serene Tsavo East and West to the coast. Open a lodge without leaving this page.",
        cards(lodges, "lodges"),
    ),
)

write(
    "transport.html",
    page(
        "Transport",
        "Airport transfers, 4x4s, group minivans and in-park game drives from Kenya Chikoh Safaris.",
        "transport",
        "images/chikoh/suv.jpg",
        "Safari 4x4 in Tsavo",
        '<a href="index.html">Home</a> <span>/</span> Chikoh <span>/</span> Transport',
        "Reliable transport",
        "Your journey begins with us — airport transfers and in-park transport, so you can focus on the adventure.",
        cards(transport, "transport"),
    ),
)

payment_body = """
      <div class="detail-layout">
        <article class="prose reveal-on">
          <h2>Secure and convenient payment</h2>
          <p>Kenya Chikoh Tours Safaris &amp; Explorers accepts cards, bank transfer, mobile money and cash. We confirm the amount in writing before you pay. No prices are listed on packages — every trip is quoted to the route.</p>
          <h2>M-Pesa Paybill</h2>
          <ul>
            <li>Paybill — <strong>222111</strong></li>
            <li>Account — <strong>2562239</strong></li>
            <li>Business name — <strong>Ndore Tours and Safaris Limited</strong></li>
          </ul>
          <h2>Bank transfer</h2>
          <ul>
            <li>Bank — <strong>Family Bank Limited</strong></li>
            <li>Account number — <strong>100000005478</strong></li>
          </ul>
          <h2>Other methods</h2>
          <ul>
            <li>Credit and debit cards — all major cards, secure checkout</li>
            <li>Mobile payments — quick local transfers</li>
            <li>Cash — for services booked directly with the desk</li>
          </ul>
        </article>
        <aside class="detail-aside reveal-on">
          <dl>
            <div><dt>Desk</dt><dd>Monday – Saturday</dd></div>
            <div><dt>Hours</dt><dd>8:00 AM – 6:00 PM</dd></div>
            <div><dt>Phone</dt><dd><a href="tel:+254721425858">+254 721 425 858</a></dd></div>
            <div><dt></dt><dd><a href="tel:+254722385188">+254 722 385 188</a></dd></div>
            <div><dt>Email</dt><dd><a href="mailto:kenyachikohsafaris@gmail.com">kenyachikohsafaris@gmail.com</a></dd></div>
          </dl>
          <button class="btn btn-dark js-reserve" type="button">Send a booking</button>
        </aside>
      </div>
"""

write(
    "payment.html",
    page(
        "Payment",
        "Pay Kenya Chikoh Safaris by Paybill 222111, Family Bank, card, mobile money or cash.",
        "payment",
        "images/savanna-sunset.jpg",
        "Kenyan savanna",
        '<a href="index.html">Home</a> <span>/</span> Payment',
        "Payment information",
        "Paybill, Family Bank, cards, mobile money and cash — the same window, no new tab.",
        payment_body,
    ),
)

print("done")
