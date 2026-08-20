(() => {
  const root = document.body.dataset.root || "";
  const page = document.body.dataset.page || "";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const links = {
    home: `${root}index.html`,
    destinations: `${root}destinations.html`,
    hotels: `${root}hotels.html`,
    editors: `${root}editors.html`,
    story: `${root}story.html`,
    contact: `${root}contact.html`,
  };

  const logo = `${root}images/logo.png`;

  const mount = (name, html) => {
    document.querySelectorAll(`[data-include="${name}"]`).forEach((node) => {
      node.outerHTML = html;
    });
  };

  mount(
    "overlays",
    `
    <div class="nav-overlay" id="navOverlay" aria-hidden="true">
      <div class="nav-overlay-inner">
        <button class="nav-close js-menu" type="button" aria-label="Close menu">
          <span></span><span></span>
        </button>
        <nav class="overlay-links">
          <a href="${links.home}" data-nav="home">Home</a>
          <a href="${links.destinations}" data-nav="destinations">Destinations</a>
          <a href="${links.hotels}" data-nav="hotels">Hotels</a>
          <a href="${links.editors}" data-nav="editors">Editor’s Choice</a>
          <a href="${links.story}" data-nav="story">Our Story</a>
          <button class="overlay-cta js-reserve" type="button">Plan Your Trip</button>
        </nav>
      </div>
    </div>
    <div class="reserve-panel" id="reservePanel" hidden>
      <div class="reserve-card">
        <button class="icon-close" id="reserveClose" type="button" aria-label="Close trip planner">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </button>
        <p class="eyebrow">TripsToKenya</p>
        <h3>Plan Your Trip</h3>
        <p class="reserve-lead">Tell us when you want Kenya. Our AI agent will curate locations, lodges, and an editor’s route.</p>
        <form id="reserveForm">
          <label>
            Destination
            <select name="destination" required>
              <option value="mara">Maasai Mara</option>
              <option value="amboseli">Amboseli</option>
              <option value="diani">Diani Beach</option>
              <option value="lamu">Lamu Archipelago</option>
              <option value="nairobi">Nairobi &amp; Highlands</option>
            </select>
          </label>
          <div class="form-row">
            <label>Arrival <input type="date" name="checkin" required /></label>
            <label>Departure <input type="date" name="checkout" required /></label>
          </div>
          <div class="form-row">
            <label>Travelers <input type="number" name="guests" min="1" max="16" value="2" /></label>
            <label>
              Style
              <select name="type">
                <option>Wildlife Safari</option>
                <option>Coast Escape</option>
                <option>Family Circuit</option>
                <option>Honeymoon</option>
              </select>
            </label>
          </div>
          <button type="submit" class="btn btn-dark btn-full">Ask the Agent</button>
        </form>
        <p class="reserve-note" id="reserveNote" hidden></p>
      </div>
    </div>
    `
  );

  mount(
    "header",
    `
    <header class="site-header">
      <div class="topbar">
        <button class="menu-btn js-menu" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="navOverlay">
          <span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="menu-label">Menu</span>
        </button>
        <a href="${links.home}" class="brand" aria-label="TripsToKenya home">
          <img src="${logo}" alt="TripsToKenya" />
        </a>
        <button class="btn btn-light js-reserve" type="button">Plan Your Trip</button>
      </div>
    </header>
    `
  );

  mount(
    "footer",
    `
    <section class="escape page-end">
      <div class="escape-bg" data-parallax="0.25">
        <img src="${root}images/savanna-sunset.jpg" alt="" />
      </div>
      <div class="escape-veil"></div>
      <div class="escape-card" data-parallax="0.04">
        <div class="escape-copy">
          <h2>Ready for Kenya?</h2>
          <p>Ask the agent for a route built around unforgettable places — ideal locations, the right hotels, and an editor’s sequence.</p>
          <button class="btn btn-dark js-reserve" type="button">Plan My Trip</button>
        </div>
        <div class="escape-photo">
          <img src="${root}images/traveler-kenya.jpg" alt="Traveler watching a Kenyan sunset" />
        </div>
      </div>
      <footer class="site-footer">
        <div class="footer-brand">
          <a href="${links.home}" class="brand" aria-label="TripsToKenya home">
            <img src="${logo}" alt="TripsToKenya" />
          </a>
          <p>An AI travel agent for Kenyan destinations that leave unforgettable memories. Destinations that inspire.</p>
        </div>
        <div class="footer-cols">
          <div>
            <h4>Explore</h4>
            <a href="${links.destinations}">Destinations</a>
            <a href="${links.hotels}">Hotels</a>
            <a href="${links.editors}">Editor’s Choice</a>
            <a href="${links.story}">Our Story</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="${links.contact}">Help Center</a>
            <a href="${links.contact}">Booking Policy</a>
            <a href="${links.contact}">Cancellation</a>
            <a href="${links.contact}">Contact</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="${links.story}">About Us</a>
            <a href="${links.story}">Careers</a>
            <a href="${links.contact}">Partners</a>
            <a href="${links.contact}">Press</a>
          </div>
        </div>
        <div class="footer-base">
          <p>© 2026 TripsToKenya. All rights reserved.</p>
          <p>
            <a href="${links.contact}">Privacy Policy</a>
            <span>·</span>
            <a href="${links.contact}">Terms of Service</a>
            <span>·</span>
            <a href="${links.contact}">Cookie Policy</a>
          </p>
        </div>
      </footer>
    </section>
    `
  );

  const overlay = document.getElementById("navOverlay");
  const reservePanel = document.getElementById("reservePanel");
  const menuButtons = [...document.querySelectorAll(".js-menu")];

  const setMenu = (open) => {
    if (!overlay) return;
    overlay.classList.toggle("is-open", open);
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("menu-open", open);
    menuButtons.forEach((btn) => {
      btn.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (btn.classList.contains("menu-btn")) {
        btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      }
    });
    if (!open && reservePanel?.hidden) document.body.style.overflow = "";
    if (open) document.body.style.overflow = "hidden";
  };

  const openReserve = () => {
    if (!reservePanel) return;
    setMenu(false);
    reservePanel.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeReserve = () => {
    if (!reservePanel) return;
    reservePanel.hidden = true;
    if (!overlay?.classList.contains("is-open")) document.body.style.overflow = "";
  };

  menuButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setMenu(!overlay.classList.contains("is-open"));
    });
  });

  overlay?.querySelector(".nav-overlay-inner")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) setMenu(false);
  });

  overlay?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.querySelectorAll(".js-reserve").forEach((btn) => {
    btn.addEventListener("click", openReserve);
  });

  document.getElementById("reserveClose")?.addEventListener("click", closeReserve);
  reservePanel?.addEventListener("click", (e) => {
    if (e.target === reservePanel) closeReserve();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setMenu(false);
      closeReserve();
    }
  });

  overlay?.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) link.classList.add("is-current");
  });

  const form = document.getElementById("reserveForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = document.getElementById("reserveNote");
    if (!note) return;
    note.hidden = false;
    note.textContent =
      "Request received. Your TripsToKenya agent will confirm lodges, flights, and an editor’s route within a few minutes.";
  });

  document.querySelectorAll(".reveal-on").forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  if (reduce) return;

  const glow = document.querySelector(".cursor-glow");
  const heroMedia = document.querySelector(".hero-media, .page-hero-media");
  let mx = 0;
  let my = 0;
  let tx = 0;
  let ty = 0;
  let ticking = false;
  const depthNodes = [...document.querySelectorAll("[data-depth]")];
  const parallaxNodes = [...document.querySelectorAll("[data-parallax]")];

  const render = () => {
    ticking = false;
    tx += (mx - tx) * 0.08;
    ty += (my - ty) * 0.08;

    if (heroMedia) {
      heroMedia.style.transform = `translate3d(${tx * 18}px, ${window.scrollY * 0.18 + ty * 12}px, 0) scale(1.08)`;
    }

    depthNodes.forEach((node) => {
      const depth = parseFloat(node.dataset.depth || "0");
      node.style.transform = `translate3d(${tx * depth * 80}px, ${ty * depth * 60}px, 0)`;
    });

    const vh = window.innerHeight;
    parallaxNodes.forEach((node) => {
      if (node === heroMedia) return;
      const speed = parseFloat(node.dataset.parallax || "0");
      const rect = node.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - vh / 2) * speed * -1;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });

    if (glow) {
      glow.style.left = `${(mx + 0.5) * window.innerWidth}px`;
      glow.style.top = `${(my + 0.5) * window.innerHeight}px`;
    }
  };

  const requestTick = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      requestTick();
    },
    { passive: true }
  );
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);
  requestTick();
})();
