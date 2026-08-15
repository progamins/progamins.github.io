/* ============================================================
   PROGAMINS — Portfolio · Interacciones
   Vanilla JS · sin dependencias · 60fps (transform/opacity)
   ============================================================ */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Año ---------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar: fondo al hacer scroll ---------- */
  var nav = $(".nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil (cierre garantizado) ---------- */
  var burger = $("#burger");
  var mobileMenu = $("#mobileMenu");
  function closeMenu() {
    if (!mobileMenu || !burger) return;
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
  function toggleMenu() {
    if (!mobileMenu || !burger) return;
    var open = mobileMenu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("menu-open", open);
  }
  if (burger && mobileMenu) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });
    // Cerrar al navegar (cada enlace del menú)
    $$("a", mobileMenu).forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("open")) closeMenu();
    });
    // Cerrar si el viewport vuelve a escritorio
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  /* ---------- Link activo en navbar ---------- */
  var navLinks = $$(".nav-links a[data-scroll]");
  if ("IntersectionObserver" in window && navLinks.length) {
    var sections = $$("section[id]");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute("id");
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("data-scroll") === id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !REDUCED) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = el.getAttribute("data-delay");
        if (delay) el.style.transitionDelay = delay + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Cursor + spotlight (solo desktop) ---------- */
  if (FINE && !REDUCED) {
    var dot = $(".cursor-dot");
    var ring = $(".cursor-ring");
    var spot = $(".spotlight");
    var mx = -100, my = -100;        // objetivo del mouse
    var rx = -100, ry = -100;        // posición actual (lerp)
    var sx = -100, sy = -100;

    if (dot && ring && spot) {
      document.addEventListener("mousemove", function (e) {
        mx = e.clientX; my = e.clientY;
        if (dot) dot.style.transform = "translate3d(" + mx + "px," + my + "px,0) translate(-50%,-50%)";
      }, { passive: true });

      (function loop() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        sx += (mx - sx) * 0.07;
        sy += (my - sy) * 0.07;
        if (ring) ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%)";
        if (spot) spot.style.transform = "translate3d(" + sx + "px," + sy + "px,0) translate(-50%,-50%)";
        requestAnimationFrame(loop);
      })();

      var hoverTargets = "a, button, .btn, .p-media, .stack-icons img, .chip";
      document.addEventListener("mouseover", function (e) {
        if (ring && e.target && e.target.closest && e.target.closest(hoverTargets)) {
          ring.classList.add("is-hover");
        }
      });
      document.addEventListener("mouseout", function (e) {
        if (ring && e.target && e.target.closest && e.target.closest(hoverTargets)) {
          ring.classList.remove("is-hover");
        }
      });
    }

    /* ---------- Botones magnéticos ---------- */
    $$(".btn").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = "translate(" + dx * 0.18 + "px," + dy * 0.22 + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });

    /* ---------- Tilt sutil en medios de proyecto ---------- */
    $$(".p-media").forEach(function (media) {
      media.addEventListener("mousemove", function (e) {
        var r = media.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        media.style.transform =
          "perspective(900px) rotateY(" + px * 3 + "deg) rotateX(" + py * -2.5 + "deg)";
      });
      media.addEventListener("mouseleave", function () {
        media.style.transform = "";
      });
    });
  }

  /* ============================================================
     GitHub · actividad real con caché y fallback estático
     ============================================================ */
  var LANG_COLORS = {
    TypeScript: "#3178c6", JavaScript: "#f1e05a", PHP: "#4f5d95",
    Java: "#b07219", HTML: "#e34c26", CSS: "#563d7c", Python: "#3572a5",
    Dockerfile: "#2496ed", Shell: "#89e051", "C#": "#178600"
  };

  var FALLBACK = [
    { name: "webhermanos", desc: "Full-stack e-commerce for a Peruvian bakery (Maison Rosas) — in production.", lang: "TypeScript", updated: "2026-08-14T23:17:42Z", url: "https://github.com/progamins/webhermanos" },
    { name: "proceso-nodes", desc: "REST API in Node.js + Express + MySQL for the IESTP app: students, grades, schedules, justifications, QR codes — with JWT auth and tests.", lang: "JavaScript", updated: "2026-08-15T19:13:00Z", url: "https://github.com/progamins/proceso-nodes" },
    { name: "iestp", desc: "Academic management system in PHP + MySQL: QR attendance, schedules, units, justifications, payments and PDF reports.", lang: "PHP", updated: "2026-08-15T04:09:34-05:00", url: "https://github.com/progamins/iestp" },
    { name: "login", desc: "Android authentication app in Java with SQL Server connectivity.", lang: "Java", updated: "2024-07-25T17:51:31Z", url: "https://github.com/progamins/login" }
  ];

  function timeAgo(iso) {
    var diff = Date.now() - new Date(iso).getTime();
    if (isNaN(diff) || diff < 0) return "recently";
    var min = 60e3, hr = 60 * min, day = 24 * hr, wk = 7 * day, mo = 30 * day, yr = 365 * day;
    if (diff < min) return "just now";
    if (diff < hr) return Math.floor(diff / min) + "m ago";
    if (diff < day) return Math.floor(diff / hr) + "h ago";
    if (diff < wk) return Math.floor(diff / day) + "d ago";
    if (diff < mo) return Math.floor(diff / wk) + "w ago";
    if (diff < yr) return Math.floor(diff / mo) + "mo ago";
    return Math.floor(diff / yr) + "y ago";
  }

  function renderRepos(repos) {
    var wrap = $("#ghList");
    if (!wrap) return;
    var list = repos
      .filter(function (r) { return r && !r.fork && r.size > 0; })
      .slice(0, 4);
    if (!list.length) list = FALLBACK;
    wrap.innerHTML = list.map(function (r, i) {
      var color = LANG_COLORS[r.language] || "#9b9ba6";
      return '<a class="gh-row" href="' + r.html_url + '" target="_blank" rel="noopener" aria-label="' +
        r.full_name + ' — abrir en GitHub">' +
        '<span class="no">0' + (i + 1) + "</span>" +
        '<span class="name">' + r.name + "</span>" +
        '<span class="meta">' + timeAgo(r.updated_at) + "</span>" +
        (r.description ? '<span class="desc">' + r.description + "</span>" : "") +
        '<span class="meta lang" style="--dot:' + color + '">' + (r.language || "—") + "</span>" +
        "</a>";
    }).join("");
  }

  function renderStats(repos) {
    var el = $("#ghLastPush");
    if (!el) return;
    if (repos && repos.length) {
      var last = repos.reduce(function (a, b) {
        return new Date(a.pushed_at) > new Date(b.pushed_at) ? a : b;
      });
      el.innerHTML = timeAgo(last.pushed_at) + ' <small>MAISON ROSAS · AGO 2026</small>';
    } else {
      el.innerHTML = "3 days ago <small>MAISON ROSAS · ACTIVE</small>";
    }
  }

  var CACHE_KEY = "pg_gh_repos_v1";
  var CACHE_TTL = 10 * 60 * 1000; // 10 minutos

  function loadGitHub() {
    var listEl = $("#ghList");
    var lastEl = $("#ghLastPush");
    if (!listEl) return;

    listEl.innerHTML = '<p class="gh-loading">Loading latest activity…</p>';
    var cached = null;
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        cached = JSON.parse(raw);
        if (Date.now() - cached.t > CACHE_TTL) cached = null;
      }
    } catch (e) { cached = null; }

    function done(repos) {
      if (repos && repos.length) {
        renderRepos(repos);
        renderStats(repos);
      } else {
        renderRepos(FALLBACK);
        renderStats(null);
      }
    }

    if (cached && cached.repos) {
      done(cached.repos);
      return;
    }

    fetch("https://api.github.com/users/progamins/repos?sort=updated&per_page=6", {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("GitHub API " + res.status);
        return res.json();
      })
      .then(function (repos) {
        if (!Array.isArray(repos) || !repos.length) throw new Error("empty");
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), repos: repos })); } catch (e) {}
        done(repos);
      })
      .catch(function () {
        done(null); // fallback estático, nunca romper la página
      });
  }
  loadGitHub();
})();
