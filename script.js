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
        "The agent built a Mara-to-Diani week we still talk about. Dawn game drive, lunch under an acacia, then the Indian Ocean two days later.",
    },
    {
      img: "images/avatar-2.jpg",
      quote:
        "Giraffe Manor on night one, then a bush flight into the Mara. TripsToKenya sequenced it so we never felt rushed — only lucky.",
    },
    {
      img: "images/avatar-4.jpg",
      quote:
        "Traveling with three kids usually means compromise. The family Amboseli circuit gave us elephants at breakfast and a lodge that actually understood children.",
    },
    {
      img: "images/avatar-1.jpg",
      quote:
        "I asked for Lamu and a little nothing-to-do. The editor’s house, a dhow at dusk, and a cook who already knew I don’t eat shellfish.",
    },
  ];
  let storyIndex = 0;

  const replies = [
    {
      test: /mara|safari|tent|wildlife|migration/i,
      title: "Maasai Mara · luxury tented camp",
      body: "Three nights on the escarpment during migration season, private guide, and a bush flight from Nairobi. Editor’s pick if this is your first Kenya safari.",
    },
    {
      test: /diani|beach|romantic|villa|coast|honeymoon/i,
      title: "Diani Beach · private villa",
      body: "A staffed beach villa on the south coast, reef snorkeling, and slow mornings. Best after safari — I can pair it with two nights in the Mara.",
    },
    {
      test: /family|kids|amboseli|nairobi|giraffe/i,
      title: "Family circuit · Nairobi to Amboseli",
      body: "Giraffe Manor on arrival, then Amboseli for elephants and Kilimanjaro views. Short drives, family suites, and a guide who works beautifully with children.",
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
  document.getElementById("planEscapeBtn").addEventListener("click", openReserve);
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
      "Request received. Your TripsToKenya agent will confirm lodges, flights, and an editor’s route within a few minutes.";
  });

  const askAgent = (query) => {
    const q = (query || "").trim();
    if (!q) return;
    agentInput.value = q;
    const match = replies.find((item) => item.test.test(q));
    const result = match || {
      title: "Custom Kenya route",
      body: "I can shape that around ideal locations, the right hotels, and an editor’s sequence. Share dates or tap Plan Your Trip and I’ll hold the lodges while we refine it.",
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

  document.querySelectorAll(".story, .overview-intro, .retreat-card, .overview-meta, .escape-card, .story-photos, .place-card, .hotel-card, .editors-copy, .editors-card, .section-head").forEach((el) => {
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
