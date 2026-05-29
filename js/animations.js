(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  // ── Lenis smooth scroll ──────────────────────────────────────────────────────

  var lenis;

  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Route nav links and scroll-to-top through Lenis (capture phase)
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a.js-scroll-trigger');
      if (link) {
        var href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            e.stopPropagation();
            lenis.scrollTo(target, { duration: 1.4 });
            var nav = document.getElementById('navbarSupportedContent');
            if (nav && nav.classList.contains('show')) {
              var bsCollapse = bootstrap.Collapse.getInstance(nav);
              if (bsCollapse) bsCollapse.hide();
            }
          }
        }
      }
      if (e.target.closest('#scroll-top')) {
        e.stopPropagation();
        lenis.scrollTo(0, { duration: 1.4 });
      }
    }, true);
  }

  // ── Text split: preserves child element classes (e.g. text-primary on h1) ───

  function splitIntoChars(el) {
    var chars = [];
    function walk(node, inheritClass) {
      if (node.nodeType === Node.TEXT_NODE) {
        var text = node.textContent;
        var frag = document.createDocumentFragment();
        for (var i = 0; i < text.length; i++) {
          var s = document.createElement('span');
          s.style.display = 'inline-block';
          if (inheritClass) s.className = inheritClass;
          s.textContent = text[i] === ' ' ? ' ' : text[i];
          frag.appendChild(s);
          chars.push(s);
        }
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        var cls = node.getAttribute('class') || '';
        Array.from(node.childNodes).forEach(function (child) { walk(child, cls); });
      }
    }
    Array.from(el.childNodes).forEach(function (child) { walk(child, ''); });
    return chars;
  }

  // ── About section: on-load entry timeline ────────────────────────────────────

  var h1 = document.querySelector('#about h1');
  var h1Chars = h1 ? splitIntoChars(h1) : [];

  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (h1Chars.length) {
    tl.from(h1Chars, { y: 80, opacity: 0, duration: 0.7, stagger: 0.03 });
  }

  tl.from('#about .tagline-wrapper', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2')
    .from('#about .subheading',      { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('#about p',                { y: 30, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.3')
    .from('#about h6',               { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
    .from('#about .list-social-icons .list-inline-item', {
      scale: 0, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(1.7)'
    }, '-=0.2');

  // ── About parallax: layers drift at different depths as you scroll away ──────

  [
    { sel: '#about h1',          y: -70 },
    { sel: '#about .subheading', y: -45 },
    { sel: '#about p',           y: -25 }
  ].forEach(function (layer) {
    gsap.to(layer.sel, {
      scrollTrigger: {
        trigger: '#about',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      },
      y: layer.y,
      ease: 'none'
    });
  });

  // ── Section headings: character-by-character cascade on scroll ───────────────

  document.querySelectorAll('section.resume-section:not(#about) h2').forEach(function (h2) {
    var chars = splitIntoChars(h2);
    gsap.from(chars, {
      scrollTrigger: { trigger: h2, start: 'top 88%', toggleActions: 'play none none none' },
      y: 60, opacity: 0, duration: 0.5, stagger: 0.025, ease: 'power3.out'
    });
  });

  // ── Resume / recommendation cards: stagger up on scroll ──────────────────────

  gsap.utils.toArray('section.resume-section:not(#about)').forEach(function (section) {
    var items = section.querySelectorAll('.resume-item, .recommendation-item');
    var misc  = section.querySelectorAll([
      'p:not(.resume-item p):not(.recommendation-item p)',
      '.fa-ul', '.list-icons', 'h4', 'h5'
    ].join(', '));

    items.forEach(function (item, i) {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.75, delay: i * 0.06, ease: 'power2.out'
      });
    });

    if (misc.length) {
      gsap.from(misc, {
        scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
        y: 28, opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out'
      });
    }
  });

  // ── Skill icons: bounce pop-in on scroll ─────────────────────────────────────

  gsap.utils.toArray('.list-icons').forEach(function (row) {
    gsap.from(row.querySelectorAll('.list-inline-item'), {
      scrollTrigger: { trigger: row, start: 'top 90%', toggleActions: 'play none none none' },
      scale: 0, opacity: 0, duration: 0.35, stagger: 0.04, ease: 'back.out(1.7)'
    });
  });

  // ── Desktop-only interactions ────────────────────────────────────────────────

  if (!isTouch) {

    // Magnetic pull on social icons
    document.querySelectorAll('#about .list-social-icons .list-inline-item a').forEach(function (icon) {
      icon.addEventListener('mousemove', function (e) {
        var r = icon.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width  / 2) * 0.35;
        var y = (e.clientY - r.top  - r.height / 2) * 0.35;
        gsap.to(icon, { x: x, y: y, duration: 0.3, ease: 'power2.out' });
      });
      icon.addEventListener('mouseleave', function () {
        gsap.to(icon, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      });
    });

    // 3D tilt + moving shine on resume cards
    document.querySelectorAll('.resume-item').forEach(function (card) {
      var rect = null;

      card.addEventListener('mouseenter', function () {
        rect = card.getBoundingClientRect();
        gsap.to(card, {
          boxShadow: '0 16px 40px rgba(31,40,52,0.14)',
          duration: 0.3
        });
      });

      card.addEventListener('mousemove', function (e) {
        if (!rect) rect = card.getBoundingClientRect();
        var xPct = (e.clientX - rect.left) / rect.width;
        var yPct = (e.clientY - rect.top)  / rect.height;
        var rotY =  (xPct - 0.5) * 2 * 6;  // ±6°
        var rotX = -(yPct - 0.5) * 2 * 3;  // ±3°

        gsap.to(card, {
          rotateY: rotY,
          rotateX: rotX,
          transformPerspective: 900,
          duration: 0.4,
          ease: 'power2.out'
        });

        // Shift the CSS-driven shine radial gradient to follow cursor
        card.style.setProperty('--shine-x', (xPct * 100).toFixed(1) + '%');
        card.style.setProperty('--shine-y', (yPct * 100).toFixed(1) + '%');
      });

      card.addEventListener('mouseleave', function () {
        gsap.to(card, {
          rotateY: 0, rotateX: 0,
          boxShadow: '0 0 0 rgba(31,40,52,0)',
          duration: 0.8, ease: 'elastic.out(1, 0.4)'
        });
        rect = null;
      });
    });
  }

})();
