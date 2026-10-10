/* ============================================================
   PROGAMINS — Portafolio ES ("Editorial Luxe")
   Vanilla JS · animaciones de scroll · reduced-motion friendly
   ============================================================ */
(function () {
  "use strict";

  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Año ---------- */
  var y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Header: borde al hacer scroll ---------- */
  var header = $("#siteHeader");
  function onHeaderScroll() {
    if (header) header.classList.toggle("on", window.scrollY > 8);
  }

  /* ---------- Barra de progreso de lectura ---------- */
  var spBar = $("#spBar");
  function onProgress() {
    if (!spBar) return;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    spBar.style.transform = "scaleX(" + p + ")";
  }

  /* ---------- Parallax sutil en imágenes de casos ---------- */
  var parallaxImgs = $$(".case .media img");
  function onParallax() {
    if (REDUCED || !parallaxImgs.length) return;
    var vh = window.innerHeight;
    parallaxImgs.forEach(function (img) {
      var rect = img.parentElement.getBoundingClientRect();
      if (rect.bottom < -60 || rect.top > vh + 60) return;
      var center = rect.top + rect.height / 2;
      var progress = (center - vh / 2) / (vh / 2); // -1..1
      if (progress > 1) progress = 1; else if (progress < -1) progress = -1;
      img.style.setProperty("--py", (progress * 13).toFixed(1) + "px");
    });
  }

  var scrollTick = false;
  function onScroll() {
    onHeaderScroll();
    onProgress();
    if (!scrollTick) {
      scrollTick = true;
      requestAnimationFrame(function () {
        onParallax();
        scrollTick = false;
      });
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onProgress);
  onScroll();

  /* ---------- Menú móvil (cierre garantizado) ---------- */
  var burger = $("#burger");
  var menu = $("#menu");
  function closeMenu() {
    if (!menu || !burger) return;
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
  function toggleMenu() {
    if (!menu || !burger) return;
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (burger && menu) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  /* ---------- Scrollspy ---------- */
  var spyLinks = $$("#navLinks a[data-spy]");
  if ("IntersectionObserver" in window && spyLinks.length) {
    var sections = $$("section[id]");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute("id");
        spyLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("data-spy") === id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Contadores animados (hero stats) ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var start = null, dur = 1100;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = $$("[data-count]");
  if (counters.length) {
    if (REDUCED || !("IntersectionObserver" in window)) {
      counters.forEach(function (el) {
        el.textContent = (el.getAttribute("data-count") || "0") + (el.getAttribute("data-suffix") || "");
      });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          cio.unobserve(entry.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ---------- Reveal on scroll (con stagger via CSS) ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !REDUCED) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -36px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
