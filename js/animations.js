(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ── About section: on-load timeline (immediately visible, no scroll trigger) ──

  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('#about h1',                              { y: 60, opacity: 0, duration: 0.9 })
    .from('#about .tagline-wrapper',                { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('#about .subheading',                     { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('#about p',                               { y: 30, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.3')
    .from('#about h6',                              { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
    .from('#about .list-social-icons .list-inline-item', {
      scale: 0, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(1.7)'
    }, '-=0.2');

  // ── All other sections: scroll-triggered reveals ─────────────────────────────

  gsap.utils.toArray('section.resume-section:not(#about)').forEach(function (section) {
    var h2    = section.querySelector('h2');
    var items = section.querySelectorAll('.resume-item, .recommendation-item');
    var misc  = section.querySelectorAll([
      'p:not(.resume-item p):not(.recommendation-item p)',
      '.fa-ul',
      '.list-icons',
      'h4', 'h5'
    ].join(', '));

    // Section heading slides in from the left
    if (h2) {
      gsap.from(h2, {
        scrollTrigger: { trigger: h2, start: 'top 88%', toggleActions: 'play none none none' },
        x: -50, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
    }

    // Resume / recommendation cards stagger up one by one
    items.forEach(function (item, i) {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.75, delay: i * 0.06, ease: 'power2.out'
      });
    });

    // Misc content (lists, paragraphs, sub-headings) fades up
    if (misc.length) {
      gsap.from(misc, {
        scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
        y: 28, opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out'
      });
    }
  });

  // ── Skill icons: pop in with a bounce ────────────────────────────────────────

  gsap.utils.toArray('.list-icons').forEach(function (row) {
    gsap.from(row.querySelectorAll('.list-inline-item'), {
      scrollTrigger: { trigger: row, start: 'top 90%', toggleActions: 'play none none none' },
      scale: 0, opacity: 0, duration: 0.35, stagger: 0.04, ease: 'back.out(1.7)'
    });
  });

})();
