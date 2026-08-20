(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let io = null;
  let parallaxTick = null;

  const pageRoot = () => document.body.dataset.root || "";
  const currentPage = () => document.body.dataset.page || "";

  const linkSet = (root) => ({
    home: `${root}index.html`,
    destinations: `${root}destinations.html`,
    hotels: `${root}hotels.html`,
    editors: `${root}editors.html`,
    story: `${root}story.html`,
    contact: `${root}contact.html`,
    packages: `${root}packages.html`,
    activities: `${root}activities.html`,
    lodges: `${root}lodges.html`,
    transport: `${root}transport.html`,
    payment: `${root}payment.html`,
    info: `${root}info.html`,
  });

  const mount = (name, html) => {
    document.querySelectorAll(`[data-include="${name}"]`).forEach((node) => {
      node.outerHTML = html;
    });
  };

  const injectChrome = () => {
    const root = pageRoot();
    const links = linkSet(root);
    const logo = `${root}images/logo.png`;

    mount(
      "overlays",
      `
      <div class="nav-overlay" id="navOverlay" aria-hidden="true">
        <div class="nav-overlay-inner">
          <button class="nav-close js-menu" type="button" aria-label="Close menu">
            <span></span><span></span>
          </button>
          <nav class="overlay-menu">
            <a href="${links.home}" class="overlay-home" data-nav="home">Home</a>
            <div class="overlay-cols">
              <div>
                <h4>Explore</h4>
                <a href="${links.destinations}" data-nav="destinations">Destinations</a>
                <a href="${links.hotels}" data-nav="hotels">Hotels</a>
                <a href="${links.packages}" data-nav="packages">Packages</a>
                <a href="${links.activities}" data-nav="activities">Activities</a>
                <a href="${links.lodges}" data-nav="lodges">Lodges</a>
                <a href="${links.transport}" data-nav="transport">Transport</a>
              </div>
              <div>
                <h4>Plan</h4>
                <a href="${links.editors}" data-nav="editors">Editor’s Choice</a>
                <a href="${links.info}" data-nav="info">Important Information</a>
                <a href="${links.story}" data-nav="story">Our Story</a>
                <a href="${links.payment}" data-nav="payment">Payment</a>
                <a href="${links.contact}" data-nav="contact">Contact</a>
              </div>
              <div>
                <h4>Desk</h4>
                <a href="${links.contact}">Help Center</a>
                <a href="tel:+254721425858">+254 721 425 858</a>
                <a href="mailto:kenyachikohsafaris@gmail.com">Email the desk</a>
              </div>
            </div>
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
                <option value="tsavo">Tsavo East &amp; West</option>
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
                  <option>Tsavo Circuit</option>
                  <option>Coast Escape</option>
                  <option>Family Circuit</option>
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
            <p>Ask the agent for a route built around unforgettable places, the right lodges, and a sequence that fits how you travel.</p>
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
              <a href="${links.packages}">Packages</a>
              <a href="${links.activities}">Activities</a>
              <a href="${links.lodges}">Lodges</a>
              <a href="${links.transport}">Transport</a>
            </div>
            <div>
              <h4>Plan</h4>
              <a href="${links.editors}">Editor’s Choice</a>
              <a href="${links.info}">Important Information</a>
              <a href="${links.story}">Our Story</a>
              <a href="${links.payment}">Payment</a>
              <a href="${links.contact}">Contact</a>
            </div>
            <div>
              <h4>Desk</h4>
              <a href="${links.contact}">Help Center</a>
              <a href="tel:+254721425858">+254 721 425 858</a>
              <a href="mailto:kenyachikohsafaris@gmail.com">Email the desk</a>
            </div>
          </div>
          <div class="footer-base">
            <p>© 2026 TripsToKenya. All rights reserved.</p>
            <p>
              <a href="${links.contact}">Privacy Policy</a>
              <span>·</span>
              <a href="${links.contact}">Terms of Service</a>
              <span>·</span>
              <a href="${links.payment}">Payment</a>
            </p>
          </div>
        </footer>
      </section>
      `
    );
  };

  const setMenu = (open) => {
    const overlay = document.getElementById("navOverlay");
    if (!overlay) return;
    overlay.classList.toggle("is-open", open);
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("menu-open", open);
    document.querySelectorAll(".js-menu").forEach((btn) => {
      btn.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (btn.classList.contains("menu-btn")) {
        btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      }
    });
    const reserve = document.getElementById("reservePanel");
    if (open) document.body.style.overflow = "hidden";
    else if (reserve?.hidden) document.body.style.overflow = "";
  };

  const openReserve = () => {
    const reserve = document.getElementById("reservePanel");
    if (!reserve) return;
    setMenu(false);
    reserve.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeReserve = () => {
    const reserve = document.getElementById("reservePanel");
    const overlay = document.getElementById("navOverlay");
    if (!reserve) return;
    reserve.hidden = true;
    if (!overlay?.classList.contains("is-open")) document.body.style.overflow = "";
  };

  const closePanels = () => {
    document.querySelectorAll(".sheet.is-open").forEach((el) => el.classList.remove("is-open"));
    document.querySelector(".catalog-host")?.classList.remove("is-reading");
  };

  const restartFade = (el) => {
    if (!el) return;
    el.classList.remove("is-fade");
    void el.offsetWidth;
    el.classList.add("is-fade");
  };

  const openPanel = (id) => {
    const sheet = document.getElementById(id);
    if (!sheet) return;
    document.querySelectorAll(".sheet.is-open").forEach((el) => {
      if (el !== sheet) el.classList.remove("is-open");
    });
    document.querySelector(".catalog-host")?.classList.add("is-reading");
    sheet.classList.add("is-open");
    restartFade(sheet);
    sheet.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const bindUi = () => {
    document.querySelectorAll(".js-menu").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const overlay = document.getElementById("navOverlay");
        setMenu(!overlay?.classList.contains("is-open"));
      });
    });

    document.querySelector(".nav-overlay-inner")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) setMenu(false);
    });

    document.querySelectorAll(".js-reserve").forEach((btn) => {
      btn.addEventListener("click", openReserve);
    });

    document.getElementById("reserveClose")?.addEventListener("click", closeReserve);
    document.getElementById("reservePanel")?.addEventListener("click", (e) => {
      if (e.target.id === "reservePanel") closeReserve();
    });

    document.getElementById("navOverlay")?.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === currentPage()) link.classList.add("is-current");
    });

    document.getElementById("reserveForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = document.getElementById("reserveNote");
      if (!note) return;
      note.hidden = false;
      note.textContent =
        "Request received. Your TripsToKenya desk will confirm lodges, transfers, and a route within a few minutes.";
    });

    document.querySelectorAll("[data-open-panel]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel(btn.dataset.openPanel);
      });
    });
    document.querySelectorAll("[data-close-panel]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        closePanels();
      });
    });

    bindHomeAgent();
  };

  const bindHomeAgent = () => {
    const agentForm = document.getElementById("agentForm");
    const agentInput = document.getElementById("agentInput");
    const agentReply = document.getElementById("agentReply");
    const guestCard = document.getElementById("guestCard");

    const stories = [
      {
        img: `${pageRoot()}images/avatar-3.jpg`,
        quote:
          "The agent built a Mara-to-Diani week we still talk about. Dawn game drive, lunch under an acacia, then the Indian Ocean two days later.",
      },
      {
        img: `${pageRoot()}images/avatar-2.jpg`,
        quote:
          "Giraffe Manor on night one, then a bush flight into the Mara. TripsToKenya sequenced it so we never felt rushed — only lucky.",
      },
      {
        img: `${pageRoot()}images/avatar-4.jpg`,
        quote:
          "Traveling with three kids usually means compromise. The family Amboseli circuit gave us elephants at breakfast and a lodge that actually understood children.",
      },
      {
        img: `${pageRoot()}images/avatar-1.jpg`,
        quote:
          "I asked for Lamu and a little nothing-to-do. The editor’s house, a dhow at dusk, and a cook who already knew I don’t eat shellfish.",
      },
    ];
    let storyIndex = 0;

    const replies = [
      {
        test: /mara|safari|tent|wildlife|migration/i,
        title: "Maasai Mara · luxury tented camp",
        body: "Three nights on the escarpment during migration season, private guide, and a bush flight from Nairobi.",
      },
      {
        test: /tsavo|voi|salt|chikoh/i,
        title: "Tsavo East & West",
        body: "One to three days in Tsavo East and West — Voi, Kilaguni or Salt Lick — with airport transfer and a pop-top game drive.",
      },
      {
        test: /diani|beach|romantic|villa|coast|honeymoon/i,
        title: "Diani Beach · private villa",
        body: "A staffed beach villa on the south coast after safari. Best paired with two nights in the Mara or Tsavo.",
      },
      {
        test: /family|kids|amboseli|nairobi|giraffe/i,
        title: "Family circuit · Nairobi to Amboseli",
        body: "Giraffe Manor on arrival, then Amboseli for elephants and Kilimanjaro views.",
      },
    ];

    const askAgent = (query) => {
      if (!agentInput || !agentReply) return;
      const q = (query || "").trim();
      if (!q) return;
      agentInput.value = q;
      const match = replies.find((item) => item.test.test(q));
      const result = match || {
        title: "Custom Kenya route",
        body: "I can shape that around ideal locations, the right lodges, and an editor’s sequence. Share dates or tap Plan Your Trip.",
      };
      agentReply.hidden = false;
      agentReply.innerHTML = `<strong>${result.title}</strong>${result.body}`;
    };

    agentForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      askAgent(agentInput.value);
    });
    document.querySelectorAll("#suggestions [data-query]").forEach((btn) => {
      btn.addEventListener("click", () => askAgent(btn.dataset.query));
    });
    document.getElementById("nextStory")?.addEventListener("click", () => {
      if (!guestCard) return;
      storyIndex = (storyIndex + 1) % stories.length;
      const next = stories[storyIndex];
      guestCard.querySelector("img").src = next.img;
      guestCard.querySelector("p").textContent = next.quote;
    });

    document
      .querySelectorAll(
        ".story, .overview-intro, .retreat-card, .overview-meta, .escape-card, .story-photos, .place-card, .hotel-card, .editors-copy, .editors-card, .section-head, .chikoh-card"
      )
      .forEach((el) => el.classList.add("reveal"));
  };

  const motion = {
    mx: 0,
    my: 0,
    tx: 0,
    ty: 0,
    ticking: false,
    glow: null,
    heroMedia: null,
    depthNodes: [],
    parallaxNodes: [],
    bound: false,
  };

  const renderMotion = () => {
    motion.ticking = false;
    motion.tx += (motion.mx - motion.tx) * 0.08;
    motion.ty += (motion.my - motion.ty) * 0.08;
    if (motion.heroMedia) {
      motion.heroMedia.style.transform = `translate3d(${motion.tx * 18}px, ${window.scrollY * 0.18 + motion.ty * 12}px, 0) scale(1.08)`;
    }
    motion.depthNodes.forEach((node) => {
      if (!node.isConnected) return;
      const depth = parseFloat(node.dataset.depth || "0");
      node.style.transform = `translate3d(${motion.tx * depth * 80}px, ${motion.ty * depth * 60}px, 0)`;
    });
    const vh = window.innerHeight;
    motion.parallaxNodes.forEach((node) => {
      if (!node.isConnected || node === motion.heroMedia) return;
      const speed = parseFloat(node.dataset.parallax || "0");
      const rect = node.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - vh / 2) * speed * -1;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });
    if (motion.glow) {
      motion.glow.style.left = `${(motion.mx + 0.5) * window.innerWidth}px`;
      motion.glow.style.top = `${(motion.my + 0.5) * window.innerHeight}px`;
    }
  };

  const requestMotion = (e) => {
    if (e && e.type === "pointermove") {
      motion.mx = e.clientX / window.innerWidth - 0.5;
      motion.my = e.clientY / window.innerHeight - 0.5;
    }
    if (!motion.ticking) {
      motion.ticking = true;
      requestAnimationFrame(renderMotion);
    }
  };

  const bindMotion = () => {
    if (io) io.disconnect();
    document.querySelectorAll(".reveal-on").forEach((el) => el.classList.add("reveal"));
    io = new IntersectionObserver(
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

    motion.glow = document.querySelector(".cursor-glow");
    motion.heroMedia = document.querySelector(".hero-media, .page-hero-media");
    motion.depthNodes = [...document.querySelectorAll("[data-depth]")];
    motion.parallaxNodes = [...document.querySelectorAll("[data-parallax]")];

    if (reduce) return;
    if (!motion.bound) {
      window.addEventListener("pointermove", requestMotion, { passive: true });
      window.addEventListener("scroll", requestMotion, { passive: true });
      window.addEventListener("resize", requestMotion);
      motion.bound = true;
    }
    requestMotion();
  };

  const boot = () => {
    injectChrome();
    bindUi();
    bindMotion();
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let routing = false;

  const isInternal = (anchor) => {
    if (!anchor || !anchor.getAttribute("href")) return false;
    const href = anchor.getAttribute("href");
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return false;
    if (anchor.hasAttribute("download")) return false;
    const url = new URL(anchor.href, location.href);
    if (url.origin !== location.origin) return false;
    if (/\.(jpg|jpeg|png|gif|webp|pdf|svg)$/i.test(url.pathname)) return false;
    return true;
  };

  const navigate = async (href, push = true) => {
    const url = new URL(href, location.href);
    if (url.pathname === location.pathname && url.hash) {
      document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (url.pathname === location.pathname && !url.hash) return;
    if (routing) return;
    routing = true;
    document.body.classList.add("is-leave");
    if (!reduce) await wait(180);

    try {
      const res = await fetch(url.pathname + url.search, { headers: { "X-Requested-With": "same-window" } });
      if (!res.ok) throw new Error(res.status);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      if (push) history.pushState({ href: url.href }, "", url.pathname + url.search + url.hash);
      document.title = doc.title;
      document.body.className = `${doc.body.className} is-enter`;
      document.body.dataset.page = doc.body.dataset.page || "";
      document.body.dataset.root = doc.body.dataset.root || "";
      document.body.innerHTML = doc.body.innerHTML;
      boot();
      window.scrollTo(0, 0);
      if (url.hash) {
        requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView());
      }
    } catch (err) {
      document.body.classList.remove("is-leave", "is-enter");
      routing = false;
      location.assign(url.href);
      return;
    }

    await wait(reduce ? 40 : 560);
    document.body.classList.remove("is-enter");
    routing = false;
  };

  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a[href]");
    if (!anchor) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    anchor.setAttribute("target", "_self");
    if (!isInternal(anchor)) return;
    e.preventDefault();
    setMenu(false);
    closeReserve();
    navigate(anchor.getAttribute("href"));
  });

  window.addEventListener("popstate", () => {
    navigate(location.href, false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setMenu(false);
      closeReserve();
      closePanels();
    }
  });

  boot();
})();
