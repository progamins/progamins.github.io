
  /* =============================================================
     Vanilla JS — no deps, transform/opacity only
     ============================================================= */
  (function(){
    "use strict";
    var $ = function(s,ctx){return (ctx||document).querySelector(s)};
    var $$ = function(s,ctx){return Array.prototype.slice.call((ctx||document).querySelectorAll(s))};

    // Year
    var y=$("#year"); if(y) y.textContent=new Date().getFullYear();

    // Theme — persist, respect system, toggle
    var KEY="pg-theme";
    var btn=$("#themeBtn");
    function systemPref(){ return window.matchMedia("(prefers-color-scheme: light)").matches ? "light":"dark"; }
    function apply(t){
      document.documentElement.setAttribute("data-theme", t);
      try{localStorage.setItem(KEY,t)}catch(e){}
      if(btn) btn.textContent = t==="light" ? "●" : "○";
      if(btn) btn.setAttribute("aria-label", t==="light" ? "Cambiar a oscuro":"Cambiar a claro");
      document.querySelector('meta[name="theme-color"]').setAttribute("content", t==="light" ? "#FCFCF9" : "#0a0a0d");
    }
    var saved=null; try{saved=localStorage.getItem(KEY)}catch(e){}
    apply(saved || systemPref());
    if(btn) btn.addEventListener("click", function(){ apply(document.documentElement.getAttribute("data-theme")==="light"?"dark":"light"); });

    // Header scrolled
    var header=$("#siteHeader");
    function onScroll(){ if(header) header.classList.toggle("scrolled", window.scrollY>8); }
    window.addEventListener("scroll", onScroll, {passive:true}); onScroll();

    // Mobile menu
    var burger=$("#burger"), mobile=$("#mobileMenu");
    function closeMenu(){ if(!mobile||!burger) return; mobile.classList.remove("open"); burger.setAttribute("aria-expanded","false"); document.body.style.overflow=""; }
    function toggleMenu(){ if(!mobile||!burger) return; var open=mobile.classList.toggle("open"); burger.setAttribute("aria-expanded", open?"true":"false"); document.body.style.overflow=open?"hidden":""; }
    if(burger&&mobile){
      burger.addEventListener("click", function(e){ e.stopPropagation(); toggleMenu(); });
      $$("a",mobile).forEach(function(a){ a.addEventListener("click", closeMenu); });
      document.addEventListener("keydown", function(e){ if(e.key==="Escape") closeMenu(); });
      window.addEventListener("resize", function(){ if(window.innerWidth>960) closeMenu(); });
    }

    // Scroll spy — IntersectionObserver
    var links=$$("#navLinks a[data-spy]");
    var sections=$$("section[id]");
    if("IntersectionObserver" in window && links.length){
      var spy=new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(!en.isIntersecting) return;
          var id=en.target.getAttribute("id");
          links.forEach(function(a){ a.classList.toggle("active", a.getAttribute("data-spy")===id); });
        });
      }, {rootMargin:"-40% 0px -55% 0px"});
      sections.forEach(function(s){ spy.observe(s); });
    }

    // Reveal
    var reveals=$$(".reveal");
    var REDUCED=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if("IntersectionObserver" in window && !REDUCED){
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(!en.isIntersecting) return;
          var el=en.target, d=el.style.transitionDelay || el.getAttribute("style") || "";
          // keep inline delay if present
          el.classList.add("in");
          io.unobserve(el);
        });
      },{threshold:0.14, rootMargin:"0px 0px -40px 0px"});
      reveals.forEach(function(el){ io.observe(el); });
    } else {
      reveals.forEach(function(el){ el.classList.add("in"); });
    }
    // Hero window — typed path + rotating stack chips
    var win=$(".hero-window");
    if(win && !REDUCED){
      win.classList.add("js-anim");
      var pathText=$(".path-text",win);
      if(pathText){
        var full=pathText.textContent, ci=0;
        pathText.textContent="";
        setTimeout(function(){
          var t=setInterval(function(){
            pathText.textContent=full.slice(0,++ci);
            if(ci>=full.length) clearInterval(t);
          },60);
        },900);
      }
      var chipEls=$$(".hero-chip",win.parentElement), pools=[
        ["React · TypeScript","React · JavaScript","HTML · CSS · JS"],
        ["Node.js · Express","MySQL · PostgreSQL","Python · MongoDB","PHP · MySQL"]
      ];
      chipEls.forEach(function(chip,i){
        var label=$("span",chip); if(!label) return;
        var pi=0;
        setTimeout(function(){
          setInterval(function(){
            if(document.visibilityState!=="visible") return;
            pi=(pi+1)%pools[i].length;
            chip.classList.add("swap-out");
            setTimeout(function(){
              label.textContent=pools[i][pi];
              chip.classList.add("swap-in");
              void chip.offsetWidth;
              chip.classList.remove("swap-out","swap-in");
            },260);
          },5000);
        },i*2500);
      });
    }
  })();
  