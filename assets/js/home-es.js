/* ============================================================
   PROGAMINS — Portafolio ES (rediseño "senior")
   Vanilla JS · sin dependencias · solo interacción esencial
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
  function onScroll() {
    if (header) header.classList.toggle("on", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
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

  /* ---------- Reveal on scroll (respetando reduced-motion) ---------- */
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
