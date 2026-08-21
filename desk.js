(() => {
  if (window.PilotDesk) return;

  const KEY = "ttk-pilot-desk-v1";
  const TZ = "Africa/Nairobi";

  const seedFiles = () => [
    {
      id: "TK-1842",
      kind: "request",
      status: "inbound",
      guest: "Amara Okonkwo",
      party: 2,
      from: "London",
      route: "Maasai Mara · Escarpment Camp",
      dates: "24–27 Aug",
      lodge: "Escarpment Camp",
      vehicle: "Bush flight Wilson → Mara",
      payment: "Not quoted",
      note: "Asked the agent for a luxury tented camp during migration. First safari.",
      img: "images/mara-landscape.jpg",
      avatar: "images/avatar-1.jpg",
      phone: "+44 7700 900184",
      time: "07:12",
    },
    {
      id: "TK-1838",
      kind: "transfer",
      status: "confirmed",
      guest: "Henrik & Elise Berg",
      party: 2,
      from: "Oslo",
      route: "Mara airstrip · then Diani villa",
      dates: "21–28 Aug",
      lodge: "Escarpment Camp → Diani villa",
      vehicle: "5Y-TKA bush flight 09:20",
      payment: "Paid in full",
      note: "Honeymoon. Private guide already assigned. Sundowner on the escarpment tonight.",
      img: "images/diani-beach.jpg",
      avatar: "images/avatar-2.jpg",
      phone: "+47 400 12 338",
      time: "09:20",
    },
    {
      id: "TK-1831",
      kind: "hold",
      status: "hold",
      guest: "The Mwangi family",
      party: 5,
      from: "Nairobi",
      route: "East & West Amboseli",
      dates: "22–25 Aug",
      lodge: "Boma Safari Lodge",
      vehicle: "Pop-top van · family",
      payment: "40% hold due",
      note: "Three children. Extra bed requested. Kilimanjaro-view rooms if they open.",
      img: "images/amboseli.jpg",
      avatar: "images/avatar-4.jpg",
      phone: "+254 722 118 440",
      time: "08:04",
    },
    {
      id: "TK-1826",
      kind: "transfer",
      status: "confirmed",
      guest: "Sophie Laurent",
      party: 1,
      from: "Paris",
      route: "Moi International · dhow to Lamu",
      dates: "21–26 Aug",
      lodge: "Peponi House",
      vehicle: "KDA 204 · then dhow 15:30",
      payment: "Paid in full",
      note: "Travels alone. No shellfish. Tide moved the dhow from 14:00 to 15:30.",
      img: "images/hotel-lamu.jpg",
      avatar: "images/avatar-3.jpg",
      phone: "+33 6 12 84 02 19",
      time: "15:30",
    },
    {
      id: "TK-1820",
      kind: "transfer",
      status: "moving",
      guest: "James Whitaker",
      party: 2,
      from: "New York",
      route: "JKIA → Giraffe Manor · Mara tomorrow",
      dates: "21–27 Aug",
      lodge: "Giraffe Manor",
      vehicle: "KCA 482 · Joseph Otieno",
      payment: "Paid in full",
      note: "Landed 06:12 T1A. Breakfast with the giraffes in the morning, bush flight Saturday.",
      img: "images/hotel-giraffe.jpg",
      avatar: "images/avatar-1.jpg",
      phone: "+1 917 555 0142",
      time: "05:40",
    },
    {
      id: "TK-1814",
      kind: "payment",
      status: "waiting",
      guest: "Priya & Rohan Mehta",
      party: 2,
      from: "Mumbai",
      route: "3 Day Tsavo East & West",
      dates: "21–24 Aug",
      lodge: "Salt Lick Safari Lodge",
      vehicle: "Land Cruiser · in-park",
      payment: "Voucher needed by 11:00",
      note: "Rooms on stilts held. Lodge wants the voucher before check-in at 16:30.",
      img: "images/chikoh/saltlick.jpg",
      avatar: "images/avatar-2.jpg",
      phone: "+91 98200 44118",
      time: "11:00",
    },
    {
      id: "TK-1809",
      kind: "request",
      status: "inbound",
      guest: "Chen Wei",
      party: 3,
      from: "Diani",
      route: "1 Day Tsavo East",
      dates: "22 Aug",
      lodge: "Day picnic · Aruba",
      vehicle: "Pop-top from Diani",
      payment: "Not quoted",
      note: "Hotel pickup on the south coast. Picnic in the park, back before dusk.",
      img: "images/chikoh/tsavo-lodge.jpg",
      avatar: "images/avatar-3.jpg",
      phone: "+254 711 903 226",
      time: "12:41",
    },
    {
      id: "TK-1802",
      kind: "hold",
      status: "hold",
      guest: "Nia Kamau",
      party: 2,
      from: "Nairobi",
      route: "2 Day Tsavo East & West",
      dates: "22–24 Aug",
      lodge: "Kilaguni Lodge",
      vehicle: "4x4 · driver-guide",
      payment: "Quoted · not held",
      note: "Wants the original park lodge and Mzima Springs. Confirm waterhole rooms.",
      img: "images/chikoh/kilaguni.jpg",
      avatar: "images/avatar-4.jpg",
      phone: "+254 721 425 858",
      time: "13:18",
    },
  ];

  const seedMoves = () => [
    {
      id: "m1",
      time: "05:40",
      who: "Joseph Otieno",
      vehicle: "KCA 482",
      what: "JKIA T1A → Giraffe Manor",
      guest: "Whitaker ×2",
      state: "done",
      file: "TK-1820",
    },
    {
      id: "m2",
      time: "06:15",
      who: "Daniel Kiptoo",
      vehicle: "KBB 119",
      what: "Voi gate · Tsavo East day",
      guest: "Day picnic · Aruba",
      state: "moving",
      file: "TK-1809",
    },
    {
      id: "m3",
      time: "09:20",
      who: "Wilson Air",
      vehicle: "5Y-TKA",
      what: "Bush flight to Mara airstrip",
      guest: "Berg ×2",
      state: "next",
      file: "TK-1838",
    },
    {
      id: "m4",
      time: "15:30",
      who: "Dhow captain",
      vehicle: "KDA 204 then dhow",
      what: "Moi International → Lamu",
      guest: "Laurent ×1",
      state: "next",
      file: "TK-1826",
    },
    {
      id: "m5",
      time: "16:30",
      who: "Lodge liaison",
      vehicle: "—",
      what: "Salt Lick check-in",
      guest: "Mehta ×2",
      state: "hold",
      file: "TK-1814",
    },
  ];

  const seedLog = () => [
    { time: "06:12", who: "Joseph", text: "Whitaker wheels-down T1A. Bags on the Cruiser, Giraffe Manor in forty." },
    { time: "06:18", who: "Daniel", text: "Galana herds on the east bank. Picnic at Aruba if the light holds." },
    { time: "07:41", who: "Lodge", text: "Salt Lick holding two stilt rooms for Mehta. Voucher by 11:00 or they release." },
    { time: "08:05", who: "Amina", text: "Laurent dhow moved to 15:30 for the tide. Peponi already knows." },
    { time: "12:41", who: "Agent", text: "New inbound: Chen Wei, three pax, one day Tsavo East from Diani tomorrow." },
  ];

  const seedVehicles = () => [
    { plate: "KCA 482", type: "Land Cruiser", driver: "Joseph Otieno", where: "Giraffe Manor", state: "moving" },
    { plate: "KBB 119", type: "Pop-top van", driver: "Daniel Kiptoo", where: "Tsavo East", state: "moving" },
    { plate: "KDA 204", type: "Land Cruiser", driver: "Idle · Wilson", where: "Wilson Airport", state: "ready" },
    { plate: "KCE 331", type: "Minivan", driver: "Idle · Nairobi", where: "Westlands yard", state: "ready" },
  ];

  const duty = [
    { role: "Desk", name: "Amina Hassan", until: "20:00" },
    { role: "Radio", name: "Daniel Kiptoo", until: "18:00" },
    { role: "JKIA", name: "Joseph Otieno", until: "14:00" },
    { role: "Lodges", name: "Wanjiku Njeri", until: "18:00" },
  ];

  const labels = {
    inbound: "Inbound",
    hold: "Lodge hold",
    confirmed: "Confirmed",
    moving: "On the road",
    waiting: "Payment",
    paid: "Paid",
    done: "Done",
    next: "Scheduled",
    ready: "Ready",
  };

  const filters = [
    { id: "all", label: "All files" },
    { id: "request", label: "Requests" },
    { id: "hold", label: "Holds" },
    { id: "transfer", label: "On the road" },
    { id: "payment", label: "Payments" },
  ];

  const fmtClock = (d = new Date()) => {
    const day = new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).format(d);
    return `${day} · ${time} EAT`;
  };

  const stamp = () =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(new Date());

  const escape = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const defaultState = () => ({
    files: seedFiles(),
    moves: seedMoves(),
    log: seedLog(),
    vehicles: seedVehicles(),
    filter: "all",
    selected: "TK-1842",
  });

  let state = defaultState();
  let clockTimer = null;
  let toastTimer = null;
  let boundRoot = null;

  const load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      state = {
        ...defaultState(),
        files: saved.files || seedFiles(),
        moves: saved.moves || seedMoves(),
        log: saved.log || seedLog(),
        vehicles: saved.vehicles || seedVehicles(),
        filter: saved.filter || "all",
        selected: saved.selected || "TK-1842",
      };
    } catch (err) {
      state = defaultState();
    }
  };

  const save = () => {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          files: state.files,
          moves: state.moves,
          log: state.log,
          vehicles: state.vehicles,
          filter: state.filter,
          selected: state.selected,
        })
      );
    } catch (err) {
      /* ignore quota */
    }
  };

  const fileById = (id) => state.files.find((item) => item.id === id);

  const visibleFiles = () => {
    if (state.filter === "all") return state.files;
    if (state.filter === "transfer") {
      return state.files.filter((item) => item.kind === "transfer" || item.status === "moving");
    }
    return state.files.filter((item) => item.kind === state.filter);
  };

  const counts = () => ({
    inbound: state.files.filter((item) => item.status === "inbound").length,
    holds: state.files.filter((item) => item.status === "hold").length,
    moving: state.moves.filter((item) => item.state === "moving" || item.state === "next").length,
    pay: state.files.filter((item) => item.status === "waiting").length,
  });

  const toast = (message) => {
    let el = document.getElementById("deskToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "deskToast";
      el.className = "desk-toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 2600);
  };

  const addLog = (who, text) => {
    state.log = [{ time: stamp(), who, text }, ...state.log].slice(0, 12);
  };

  const setStatus = (id, status, extra = {}) => {
    state.files = state.files.map((item) => (item.id === id ? { ...item, status, ...extra } : item));
    state.moves = state.moves.map((item) => (item.file === id && extra.moveState ? { ...item, state: extra.moveState } : item));
  };

  const act = (id, action) => {
    if (action === "inbound") {
      const next = {
        id: `TK-${1800 + Math.floor(Math.random() * 90)}`,
        kind: "request",
        status: "inbound",
        guest: "Maya Adeyemi",
        party: 4,
        from: "Accra",
        route: "Nairobi, Maasai Mara & Nakuru",
        dates: "29 Aug – 1 Sep",
        lodge: "Escarpment Camp",
        vehicle: "Not assigned",
        payment: "Not quoted",
        note: "Agent just filed this. Family of four, first Kenya, want cats and the soda lake.",
        img: "images/mara-landscape.jpg",
        avatar: "images/avatar-1.jpg",
        phone: "+233 24 555 0190",
        time: stamp(),
      };
      state.files = [next, ...state.files];
      state.selected = next.id;
      state.filter = "all";
      addLog("Agent", `New inbound: ${next.guest}, ${next.party} pax, ${next.route}.`);
      toast(`Inbound · ${next.id}`);
      save();
      render();
      return;
    }
    if (action === "reset") {
      localStorage.removeItem(KEY);
      state = defaultState();
      toast("Board reset to this morning’s board");
      save();
      render();
      return;
    }
    const file = fileById(id);
    if (!file) return;
    if (action === "confirm") {
      setStatus(id, "confirmed", file.kind === "request" ? { kind: "hold", payment: "Quoted · rooms next" } : {});
      addLog("Amina", `${file.id} confirmed for ${file.guest}.`);
      toast(`Confirmed ${file.id} · ${file.guest}`);
    } else if (action === "hold") {
      setStatus(id, "hold", { kind: "hold" });
      addLog("Lodges", `Hold placed at ${file.lodge} for ${file.guest}.`);
      toast(`Lodge hold · ${file.lodge}`);
    } else if (action === "dispatch") {
      setStatus(id, "moving", { kind: "transfer", moveState: "moving" });
      addLog("Radio", `${file.vehicle} dispatched for ${file.guest}.`);
      toast(`Dispatched · ${file.guest}`);
    } else if (action === "paid") {
      setStatus(id, "paid", { kind: "payment", payment: "Paid in full", moveState: "next" });
      addLog("Desk", `Payment marked for ${file.id}. Salt Lick voucher can go.`);
      toast(`Marked paid · ${file.id}`);
    } else if (action === "release") {
      setStatus(id, "inbound", { kind: "request" });
      addLog("Lodges", `Hold released on ${file.id}.`);
      toast(`Released ${file.id}`);
    } else if (action === "complete") {
      setStatus(id, "confirmed", { moveState: "done" });
      addLog("Radio", `${file.id} complete. Guests with the lodge.`);
      toast(`Complete · ${file.guest}`);
    }
    save();
    render();
  };

  const actionsFor = (file) => {
    if (!file) return "";
    const id = file.id;
    if (file.status === "inbound") {
      return `
        <button class="btn btn-dark" type="button" data-desk-act="confirm" data-id="${id}">Confirm route</button>
        <button class="btn btn-ghost" type="button" data-desk-act="hold" data-id="${id}">Hold lodge</button>
      `;
    }
    if (file.status === "hold") {
      return `
        <button class="btn btn-dark" type="button" data-desk-act="confirm" data-id="${id}">Confirm rooms</button>
        <button class="btn btn-ghost" type="button" data-desk-act="release" data-id="${id}">Release</button>
      `;
    }
    if (file.status === "waiting") {
      return `
        <button class="btn btn-dark" type="button" data-desk-act="paid" data-id="${id}">Mark paid</button>
        <a class="btn btn-ghost" href="payment.html">Paybill 222111</a>
      `;
    }
    if (file.status === "moving") {
      return `
        <button class="btn btn-dark" type="button" data-desk-act="complete" data-id="${id}">Mark arrived</button>
        <a class="btn btn-ghost" href="tel:${escape(file.phone)}">Call driver</a>
      `;
    }
    return `
      <button class="btn btn-dark" type="button" data-desk-act="dispatch" data-id="${id}">Dispatch</button>
      <a class="btn btn-ghost" href="tel:${escape(file.phone)}">Call guest</a>
    `;
  };

  const kpi = (n, label, hint) => `
    <article class="desk-kpi reveal">
      <b>${n}</b>
      <span>${escape(label)}</span>
      <small>${escape(hint)}</small>
    </article>
  `;

  const renderFile = (item, selected) => `
    <button
      class="desk-row ${selected ? "is-on" : ""}"
      type="button"
      data-desk-select="${item.id}"
      aria-pressed="${selected ? "true" : "false"}"
    >
      <img src="${escape(item.img)}" alt="" />
      <span class="desk-row-copy">
        <strong>${escape(item.guest)}</strong>
        <em>${escape(item.route)}</em>
        <small>${escape(item.id)} · ${escape(item.dates)} · ${item.party} pax</small>
      </span>
      <span class="desk-pill ${escape(item.status)}">${escape(labels[item.status] || item.status)}</span>
    </button>
  `;

  const renderMove = (item) => `
    <li class="desk-move">
      <time>${escape(item.time)}</time>
      <div>
        <strong>${escape(item.what)}</strong>
        <span>${escape(item.who)} · ${escape(item.vehicle)}</span>
        <span>${escape(item.guest)}</span>
      </div>
      <span class="desk-pill ${escape(item.state)}">${escape(labels[item.state] || item.state)}</span>
    </li>
  `;

  const render = () => {
    const root = document.getElementById("pilotDesk");
    if (!root) return;
    const n = counts();
    const files = visibleFiles();
    if (state.selected && !files.some((item) => item.id === state.selected) && files[0]) {
      state.selected = files[0].id;
    }
    const selected = fileById(state.selected) || files[0] || null;

    root.innerHTML = `
      <section class="desk-kpis" aria-label="Desk counts">
        ${kpi(n.inbound, "Inbound", "From the agent this morning")}
        ${kpi(n.holds, "Lodge holds", "Waiting on rooms")}
        ${kpi(n.moving, "Movements", "Still to run today")}
        ${kpi(n.pay, "Payments", "Vouchers before check-in")}
      </section>

      <div class="desk-shift">
        ${duty
          .map(
            (person) => `
          <div>
            <span>${escape(person.role)}</span>
            <strong>${escape(person.name)}</strong>
            <em>Until ${escape(person.until)}</em>
          </div>
        `
          )
          .join("")}
        <button class="btn btn-light" type="button" data-desk-act="inbound">Simulate inbound</button>
      </div>

      <div class="desk-filters" role="tablist" aria-label="Filter files">
        ${filters
          .map(
            (item) => `
          <button
            type="button"
            role="tab"
            class="${state.filter === item.id ? "is-on" : ""}"
            aria-selected="${state.filter === item.id ? "true" : "false"}"
            data-desk-filter="${item.id}"
          >${escape(item.label)}</button>
        `
          )
          .join("")}
      </div>

      <div class="desk-board">
        <section class="desk-queue" aria-label="Trip files">
          <header>
            <p class="eyebrow light">The queue</p>
            <h2>${files.length} file${files.length === 1 ? "" : "s"}</h2>
          </header>
          <div class="desk-rows">
            ${
              files.length
                ? files.map((item) => renderFile(item, selected && item.id === selected.id)).join("")
                : `<p class="desk-empty">Nothing in this tray. The desk is clear.</p>`
            }
          </div>
        </section>

        <aside class="desk-side">
          ${
            selected
              ? `
            <article class="desk-file">
              <img src="${escape(selected.img)}" alt="" />
              <div class="desk-file-body">
                <p class="eyebrow light">${escape(selected.id)} · ${escape(selected.time)} EAT</p>
                <h3>${escape(selected.guest)}</h3>
                <p class="desk-file-lead">${escape(selected.note)}</p>
                <dl>
                  <div><dt>From</dt><dd>${escape(selected.from)}</dd></div>
                  <div><dt>Party</dt><dd>${selected.party}</dd></div>
                  <div><dt>Route</dt><dd>${escape(selected.route)}</dd></div>
                  <div><dt>Dates</dt><dd>${escape(selected.dates)}</dd></div>
                  <div><dt>Lodge</dt><dd>${escape(selected.lodge)}</dd></div>
                  <div><dt>Vehicle</dt><dd>${escape(selected.vehicle)}</dd></div>
                  <div><dt>Payment</dt><dd>${escape(selected.payment)}</dd></div>
                </dl>
                <div class="desk-actions">
                  ${actionsFor(selected)}
                </div>
              </div>
            </article>
          `
              : ""
          }

          <section class="desk-card">
            <p class="eyebrow light">Today on the ground</p>
            <h3>Run sheet</h3>
            <ol class="desk-moves">
              ${state.moves.map(renderMove).join("")}
            </ol>
          </section>

          <section class="desk-card">
            <p class="eyebrow light">Yard</p>
            <h3>Vehicles</h3>
            <ul class="desk-fleet">
              ${state.vehicles
                .map(
                  (car) => `
                <li>
                  <strong>${escape(car.plate)}</strong>
                  <span>${escape(car.type)} · ${escape(car.driver)}</span>
                  <em>${escape(car.where)}</em>
                  <span class="desk-pill ${escape(car.state)}">${escape(labels[car.state] || car.state)}</span>
                </li>
              `
                )
                .join("")}
            </ul>
          </section>

          <section class="desk-card">
            <p class="eyebrow light">Radio</p>
            <h3>Desk log</h3>
            <ul class="desk-log">
              ${state.log
                .map(
                  (entry) => `
                <li>
                  <time>${escape(entry.time)}</time>
                  <div><strong>${escape(entry.who)}</strong> ${escape(entry.text)}</div>
                </li>
              `
                )
                .join("")}
            </ul>
            <button class="stories-link" type="button" data-desk-act="reset">
              Reset this morning’s board
              <span class="circle-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </button>
          </section>
        </aside>
      </div>
    `;

    root.querySelectorAll(".reveal").forEach((el) => {
      requestAnimationFrame(() => el.classList.add("is-in"));
    });
  };

  const onClick = (e) => {
    const filter = e.target.closest("[data-desk-filter]");
    if (filter) {
      state.filter = filter.dataset.deskFilter;
      const first = visibleFiles()[0];
      if (first) state.selected = first.id;
      save();
      render();
      return;
    }
    const select = e.target.closest("[data-desk-select]");
    if (select) {
      state.selected = select.dataset.deskSelect;
      save();
      render();
      const file = document.querySelector(".desk-file");
      if (file && window.matchMedia("(max-width: 1080px)").matches) {
        file.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    const action = e.target.closest("[data-desk-act]");
    if (action) {
      act(action.dataset.id, action.dataset.deskAct);
    }
  };

  const tickClock = () => {
    const nodes = document.querySelectorAll("[data-desk-clock]");
    if (!nodes.length) return;
    const text = fmtClock();
    nodes.forEach((node) => {
      node.textContent = text;
    });
  };

  const startClock = () => {
    tickClock();
    if (clockTimer) return;
    clockTimer = setInterval(() => {
      if (!document.querySelector("[data-desk-clock]")) return;
      tickClock();
    }, 1000);
  };

  const mount = () => {
    const root = document.getElementById("pilotDesk");
    if (!root) return;
    load();
    if (boundRoot !== root) {
      boundRoot = root;
      root.addEventListener("click", onClick);
    }
    render();
    startClock();
  };

  window.PilotDesk = { mount };

  if (document.body?.dataset.page === "desk") mount();
})();
