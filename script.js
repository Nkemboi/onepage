(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.querySelector(".hero-frame");
  const heroMedia = document.querySelector(".hero-media");
  const glow = document.querySelector(".cursor-glow");
  const overlay = document.getElementById("navOverlay");
  const reservePanel = document.getElementById("reservePanel");
  const agentForm = document.getElementById("agentForm");
  const agentInput = document.getElementById("agentInput");
  const agentReply = document.getElementById("agentReply");
  const guestCard = document.getElementById("guestCard");

  const stories = [
    {
      img: "images/avatar-3.jpg",
      quote:
        "What started as a weekend getaway became our favorite annual tradition. Every detail—from the villa to the personalized itinerary—felt effortless and unforgettable.",
    },
    {
      img: "images/avatar-2.jpg",
      quote:
        "The AI planner found a cliffside villa we never would have discovered on our own. Morning mist over the lake, dinner waiting when we returned from the trail.",
    },
    {
      img: "images/avatar-4.jpg",
      quote:
        "Traveling with three kids usually means compromise. HillView Ai gave us space, quiet, and a schedule that actually felt like a holiday.",
    },
    {
      img: "images/avatar-1.jpg",
      quote:
        "I asked for a wellness weekend and woke up above the clouds. Spa at dusk, stargazing from the terrace, and not a single decision I had to make twice.",
    },
  ];
  let storyIndex = 0;

  const replies = [
    {
      test: /family|kids|scenic|villa/i,
      title: "Family villa, Aspen",
      body: "A 5-bedroom ridgeline villa with heated indoor-outdoor pool, kids’ alpine club, and a private chef. Best window: late September through February.",
    },
    {
      test: /romantic|weekend|two|couple/i,
      title: "Romantic hideaway, Zermatt",
      body: "A glass chalet for two with a cedar soak, stargazing deck, and a tasting menu delivered in-villa. I can hold Friday–Sunday next month.",
    },
    {
      test: /wellness|spa|retreat/i,
      title: "Wellness retreat, Banff",
      body: "A clifftop suite with panoramic spa, sunrise yoga pavilion, and a concierge-led forest bathing walk. Airport pickup is already reserved.",
    },
  ];

  const openOverlay = (el) => {
    el.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeOverlay = (el) => {
    el.hidden = true;
    if (overlay.hidden && reservePanel.hidden) {
      document.body.style.overflow = "";
    }
  };

  document.getElementById("menuBtn").addEventListener("click", () => openOverlay(overlay));
  document.getElementById("navClose").addEventListener("click", () => closeOverlay(overlay));
  overlay.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => closeOverlay(overlay));
  });

  const openReserve = () => openOverlay(reservePanel);
  document.getElementById("reserveBtn").addEventListener("click", openReserve);
  document.getElementById("planStayBtn").addEventListener("click", openReserve);
  document.getElementById("reserveClose").addEventListener("click", () => closeOverlay(reservePanel));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay(overlay);
  });
  reservePanel.addEventListener("click", (e) => {
    if (e.target === reservePanel) closeOverlay(reservePanel);
  });

  document.getElementById("reserveForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const note = document.getElementById("reserveNote");
    note.hidden = false;
    note.textContent =
      "Request received. A HillView concierge will confirm live villa availability within a few minutes.";
  });

  const askAgent = (query) => {
    const q = (query || "").trim();
    if (!q) return;
    agentInput.value = q;
    const match = replies.find((item) => item.test.test(q));
    const result = match || {
      title: "Custom escape",
      body: "I can shape a stay around that. Tell me dates and how many are traveling, or tap Reserve Your Stay and I’ll hold a villa while we refine the plan.",
    };
    agentReply.hidden = false;
    agentReply.innerHTML = `<strong>${result.title}</strong>${result.body}`;
  };

  agentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    askAgent(agentInput.value);
  });

  document.querySelectorAll("#suggestions [data-query]").forEach((btn) => {
    btn.addEventListener("click", () => askAgent(btn.dataset.query));
  });

  document.getElementById("nextStory").addEventListener("click", () => {
    storyIndex = (storyIndex + 1) % stories.length;
    const next = stories[storyIndex];
    guestCard.querySelector("img").src = next.img;
    guestCard.querySelector("p").textContent = next.quote;
  });

  document.querySelectorAll(".story, .overview-intro, .retreat-card, .overview-meta, .escape-card, .story-photos").forEach((el) => {
    el.classList.add("reveal");
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  if (reduce) return;

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
      const scroll = window.scrollY;
      heroMedia.style.transform = `translate3d(${tx * 18}px, ${scroll * 0.18 + ty * 12}px, 0) scale(1.08)`;
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
      glow.style.left = `${mx * window.innerWidth}px`;
      glow.style.top = `${my * window.innerHeight}px`;
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
