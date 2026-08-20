(() => {
  const agentForm = document.getElementById("agentForm");
  const agentInput = document.getElementById("agentInput");
  const agentReply = document.getElementById("agentReply");
  const guestCard = document.getElementById("guestCard");
  if (!agentForm && !guestCard) return;

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

  const askAgent = (query) => {
    if (!agentInput || !agentReply) return;
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
    .querySelectorAll(".story, .overview-intro, .retreat-card, .overview-meta, .escape-card, .story-photos, .place-card, .hotel-card, .editors-copy, .editors-card, .section-head")
    .forEach((el) => el.classList.add("reveal"));
})();
