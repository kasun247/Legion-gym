/* =============================================================================
   LEGION — script.js
   Vanilla JS, no dependencies. Wires up every interaction described in the
   README. All motion respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===========================================================================
     IMAGES — SINGLE SOURCE OF TRUTH for every photo on the page.
     Swap any URL here (and the page re-skins). Each entry pairs a real Unsplash
     fitness URL with descriptive alt text. All gym-only imagery.

     NOTE: the hero poster + background image live directly in index.html /
     styles.css because they are above-the-fold critical assets.
     =========================================================================== */
  const U = (id, w = 900) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

  const IMAGES = {
    /* Hero trust-row avatars (decorative — alt intentionally empty) */
    avatar1: { src: U("1494790108377-be9c29b29330", 120), alt: "" },
    avatar2: { src: U("1507003211169-0a1dd7228f2d", 120), alt: "" },
    avatar3: { src: U("1500648767791-00dcc994a43e", 120), alt: "" },
    avatar4: { src: U("1568602471122-7832951cc4c5", 120), alt: "" },

    /* 4 · Programs */
    progStrength:   { src: U("1534438327276-14e5300c3a48", 800), alt: "Athlete mid-set pressing a heavy dumbbell in a dimly lit strength gym" },
    progFatLoss:    { src: U("1599058917765-a780eda07a3e", 800), alt: "Member slamming battle ropes during a high-intensity conditioning circuit" },
    progFunctional: { src: U("1574680096145-d05b474e2155", 800), alt: "Athlete swinging a kettlebell through a functional, mobility-focused movement" },

    /* 5 · Method steps */
    step1: { src: U("1571902943202-507ec2618e8f", 720), alt: "Coach and member reviewing goals during an initial fitness assessment" },
    step2: { src: U("1517836357463-d25dfeac3438", 720), alt: "Coach guiding a member's barbell form during a training session" },
    step3: { src: U("1532384748853-8f54a8f476e2", 720), alt: "Personalised training plan written on a board beside loaded barbells" },
    step4: { src: U("1540497077202-7c8a3999166f", 720), alt: "Member checking performance metrics while training on the cardio floor" },

    /* 6 · Results (representative member training photos, before / after) */
    andrewBefore:  { src: U("1532029837206-abbe2b7620e3", 500), alt: "Andrew at the start of his strength program" },
    andrewAfter:   { src: U("1518611012118-696072aa579a", 500), alt: "Andrew showing leaner, stronger physique after 16 weeks" },
    dinithiBefore: { src: U("1518310383802-640c2de311b2", 500), alt: "Dinithi at the start of her conditioning program" },
    dinithiAfter:  { src: U("1541534741688-6078c6bfb5c5", 500), alt: "Dinithi fitter and leaner after 12 weeks of training" },
    marcusBefore:  { src: U("1583454110551-21f2fa2afe61", 500), alt: "Marcus at the start of his functional strength program" },
    marcusAfter:   { src: U("1599058917765-a780eda07a3e", 500), alt: "Marcus stronger and more conditioned after 20 weeks" },

    /* 7 · Coaches (4 distinct people) */
    coachPrasanna: { src: U("1568602471122-7832951cc4c5", 600), alt: "Prasanna D., Head Coach, smiling in the gym" },
    coachKalana:   { src: U("1633332755192-727a05c4013d", 600), alt: "Kalana W., Performance Coach, portrait" },
    coachNadia:    { src: U("1594381898411-846e7d193883", 600), alt: "Nadia F., Mobility Coach, demonstrating a stretch" },
    coachRuwan:    { src: U("1507003211169-0a1dd7228f2d", 600), alt: "Ruwan S., Nutrition Coach, portrait" },

    /* 8 · Gallery (gym interiors & training only) */
    gal1: { src: U("1571902943202-507ec2618e8f", 600), alt: "Wide view of the LEGION free-weights floor" },
    gal2: { src: U("1534258936925-c58bed479fcb", 600), alt: "Member training back with cable equipment" },
    gal3: { src: U("1571019613454-1cb2f99b2d8b", 600), alt: "Row of treadmills on the cardio floor" },
    gal4: { src: U("1583454110551-21f2fa2afe61", 600), alt: "Rack of weight plates and barbells" },
    gal5: { src: U("1526506118085-60ce8714f8c5", 600), alt: "Kettlebells lined up before a group class" },
    gal6: { src: U("1558611848-73f7eb4001a1", 600), alt: "Members in a mobility and stretching session" },

    /* 10 · Testimonials (distinct people, none reused from coaches) */
    testLiyoni:   { src: U("1438761681033-6461ffad8d80", 120), alt: "Liyoni S., LEGION member" },
    testVimukthi: { src: U("1506794778202-cad84cf45f1d", 120), alt: "Vimukthi P., LEGION member" },
    testNadun:    { src: U("1539571696357-5a69c17a67c6", 120), alt: "Nadun S., designer and LEGION member" }
  };

  /* Apply IMAGES to every [data-img] element */
  document.querySelectorAll("[data-img]").forEach((img) => {
    const data = IMAGES[img.dataset.img];
    if (!data) return;
    img.src = data.src;
    if (!img.alt) img.alt = data.alt; // don't clobber an author-set alt
  });

  /* ===========================================================================
     0 · Announcement bar — dismissible (remembers choice for the session)
     =========================================================================== */
  const announce = document.getElementById("announce");
  const announceClose = document.getElementById("announceClose");
  if (announce && sessionStorage.getItem("legion_announce_closed") === "1") {
    announce.classList.add("is-hidden");
  }
  announceClose?.addEventListener("click", () => {
    announce.classList.add("is-hidden");
    try { sessionStorage.setItem("legion_announce_closed", "1"); } catch (e) {}
  });

  /* ===========================================================================
     1 · Sticky nav — transparent over hero, solid after scroll
     =========================================================================== */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile full-screen menu */
  const burger = document.getElementById("navBurger");
  const menu = document.getElementById("mobileMenu");
  const setMenu = (open) => {
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger?.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      burger.focus();
    }
  });

  /* ===========================================================================
     3 · Stat count-up on scroll-in
     =========================================================================== */
  const formatNum = (n) => n.toLocaleString("en-US");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = formatNum(target) + suffix; return; }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = formatNum(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ===========================================================================
     Scroll-reveal + count triggers via IntersectionObserver
     =========================================================================== */
  const reveals = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".stat__num");

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));

    const countIO = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => countIO.observe(el));
  } else {
    /* No IO or reduced motion: show everything immediately */
    reveals.forEach((el) => el.classList.add("is-visible"));
    counters.forEach((el) => { el.textContent = formatNum(parseFloat(el.dataset.count)) + (el.dataset.suffix || ""); });
  }

  /* ===========================================================================
     9 · Pricing monthly / annual toggle
     Annual = 10 × monthly (2 months free). Prices computed from data-monthly,
     so there is one number per plan to edit.
     =========================================================================== */
  const toggle = document.getElementById("billingToggle");
  const lblMonthly = document.getElementById("lblMonthly");
  const lblAnnual = document.getElementById("lblAnnual");
  const fmt = (n) => "" + Math.round(n).toLocaleString("en-US");

  const renderPrices = (annual) => {
    document.querySelectorAll(".plan").forEach((plan) => {
      const amountEl = plan.querySelector(".plan__amount");
      const periodEl = plan.querySelector(".plan__period");
      const noteEl = plan.querySelector("[data-note]");
      const monthly = parseFloat(amountEl.dataset.monthly);
      if (annual) {
        const yearly = monthly * 10;
        amountEl.textContent = fmt(yearly);
        periodEl.textContent = "/yr";
        noteEl.textContent = `Rs. ${fmt(yearly / 12)}/mo billed annually`;
      } else {
        amountEl.textContent = fmt(monthly);
        periodEl.textContent = "/mo";
        noteEl.textContent = "Billed monthly";
      }
    });
  };
  const setBilling = (annual) => {
    toggle.setAttribute("aria-checked", String(annual));
    lblMonthly.classList.toggle("is-active", !annual);
    lblAnnual.classList.toggle("is-active", annual);
    renderPrices(annual);
  };
  setBilling(false);
  toggle?.addEventListener("click", () =>
    setBilling(toggle.getAttribute("aria-checked") !== "true")
  );

  /* ===========================================================================
     10 · Testimonial slider (keyboard + dots, wraps around)
     =========================================================================== */
  const slider = document.getElementById("testimonialSlider");
  if (slider) {
    const track = slider.querySelector(".slider__track");
    const slides = Array.from(slider.querySelectorAll(".tcard"));
    const dotsWrap = document.getElementById("tDots");
    const prev = document.getElementById("tPrev");
    const next = document.getElementById("tNext");
    let index = 0;

    /* perPage based on flex-basis breakpoints in CSS */
    const perPage = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 760 ? 2 : 1);
    const maxIndex = () => Math.max(0, slides.length - perPage());

    /* Build dots */
    const buildDots = () => {
      dotsWrap.innerHTML = "";
      const pages = maxIndex() + 1;
      for (let i = 0; i < pages; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
        b.addEventListener("click", () => go(i));
        dotsWrap.appendChild(b);
      }
    };

    const go = (i) => {
      index = Math.max(0, Math.min(i, maxIndex()));
      const slideW = slides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(slides[0]).marginRight) || 0;
      track.style.transform = `translateX(${-(index * (slideW + gap))}px)`;
      Array.from(dotsWrap.children).forEach((d, di) =>
        d.setAttribute("aria-selected", String(di === index))
      );
    };

    prev?.addEventListener("click", () => go(index <= 0 ? maxIndex() : index - 1));
    next?.addEventListener("click", () => go(index >= maxIndex() ? 0 : index + 1));
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { go(index - 1); }
      if (e.key === "ArrowRight") { go(index + 1); }
    });

    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => { buildDots(); go(Math.min(index, maxIndex())); }, 150);
    });
    buildDots();
    go(0);
  }

  /* ===========================================================================
     11 · FAQ accordion (accessible; one panel animates via max-height)
     =========================================================================== */
  document.querySelectorAll(".acc__trigger").forEach((trigger) => {
    const panel = trigger.parentElement.nextElementSibling;
    trigger.addEventListener("click", () => {
      const open = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!open));
      panel.style.maxHeight = open ? null : panel.scrollHeight + "px";
    });
  });

  /* ===========================================================================
     12 · Lead form — styled only; show a success message, no network call
     =========================================================================== */
  const form = document.getElementById("leadForm");
  const success = document.getElementById("formSuccess");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    success.hidden = false;
    form.querySelector(".cta__submit").textContent = "Sent ✓";
  });

  /* ===========================================================================
     Hero video — if the external clip fails, drop it so the poster shows
     =========================================================================== */
  const heroVideo = document.getElementById("heroVideo");
  heroVideo?.addEventListener("error", () => { heroVideo.style.display = "none"; }, true);

  /* Footer year */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
