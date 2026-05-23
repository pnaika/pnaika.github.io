(function () {
  'use strict';

  var ACHIEVEMENTS = [
    { id: 'welcome',    emoji: '👋', title: 'Welcome!',          desc: 'You found the portfolio'           },
    { id: 'dark',       emoji: '🌙', title: 'Night Owl',         desc: 'Switched to dark mode'             },
    { id: 'retro',      emoji: '📺', title: 'Retro Fan',         desc: 'Enabled CRT mode. Respect.'        },
    { id: 'terminal',   emoji: '💻', title: 'Terminal Hacker',   desc: 'Opened the CLI'                    },
    { id: 'cmd5',       emoji: '🎯', title: 'Command Master',    desc: 'Ran 5 terminal commands'           },
    { id: 'experience', emoji: '📅', title: 'Career Curious',    desc: 'Checked out the work history'     },
    { id: 'github',     emoji: '🔍', title: 'GitHub Stalker',    desc: 'Snooping through the repos'       },
    { id: 'blog',       emoji: '📚', title: 'Blog Reader',       desc: 'Clicked on a blog post'           },
    { id: 'awards',     emoji: '🏅', title: 'Trophy Hunter',     desc: 'Found the awards section'         },
    { id: 'scrolled',   emoji: '🏆', title: 'Bottom Feeder',     desc: 'Scrolled all the way down!'       },
    { id: 'email',      emoji: '📋', title: 'Copy Cat',          desc: 'Copied the email address'         },
    { id: 'snake',      emoji: '🐍', title: 'Easter Egg Hunter', desc: 'Found the hidden snake game!'     },
    { id: 'snake10',    emoji: '🎮', title: 'Snake Master',      desc: 'Scored 10+ in the snake game'    },
    { id: 'matrix',    emoji: '🟩', title: 'Follow the White Rabbit', desc: 'Entered the Matrix'          },
  ];

  var unlocked = [];
  try { unlocked = JSON.parse(localStorage.getItem('pn_achievements') || '[]'); } catch (e) {}

  var toastQueue  = [];
  var toastActive = false;

  function save() {
    try { localStorage.setItem('pn_achievements', JSON.stringify(unlocked)); } catch (e) {}
  }

  function unlock(id) {
    if (unlocked.indexOf(id) !== -1) return;
    var ach = null;
    for (var i = 0; i < ACHIEVEMENTS.length; i++) {
      if (ACHIEVEMENTS[i].id === id) { ach = ACHIEVEMENTS[i]; break; }
    }
    if (!ach) return;
    unlocked.push(id);
    save();
    toastQueue.push(ach);
    drainQueue();
  }

  function drainQueue() {
    if (toastActive || toastQueue.length === 0) return;
    toastActive = true;
    showToast(toastQueue.shift(), function () {
      toastActive = false;
      setTimeout(drainQueue, 300);
    });
  }

  function showToast(ach, done) {
    var el = document.createElement('div');
    el.className = 'ach-toast';
    el.innerHTML =
      '<span class="ach-emoji">' + ach.emoji + '</span>' +
      '<div class="ach-body">' +
        '<div class="ach-label">Achievement Unlocked</div>' +
        '<div class="ach-title">' + ach.title + '</div>' +
        '<div class="ach-desc">'  + ach.desc  + '</div>' +
      '</div>';

    document.body.appendChild(el);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add('ach-show'); });
    });

    setTimeout(function () {
      el.classList.remove('ach-show');
      el.addEventListener('transitionend', function () {
        el.remove();
        done();
      }, { once: true });
    }, 3400);
  }

  // ─── Expose globally ───────────────────────────────────────────────────────

  window.Achievement = { unlock: unlock };

  // ─── Auto unlocks ──────────────────────────────────────────────────────────

  setTimeout(function () { unlock('welcome'); }, 1200);

  // Scroll to bottom
  window.addEventListener('scroll', function () {
    var pct = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    if (pct > 0.97) unlock('scrolled');
  }, { passive: true });

  // Section visibility
  var sectionAch = { experience: 'experience', github: 'github', awards: 'awards' };
  var seen = {};
  var secObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.id;
      if (entry.isIntersecting && sectionAch[id] && !seen[id]) {
        seen[id] = true;
        unlock(sectionAch[id]);
      }
    });
  }, { threshold: 0.25 });

  Object.keys(sectionAch).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) secObserver.observe(el);
  });

  // Blog clicks
  document.addEventListener('click', function (e) {
    if (e.target.closest('a[href*="blog"]')) unlock('blog');
  });

  // Email copy
  document.addEventListener('click', function (e) {
    if (e.target.closest('.copy-email-btn')) unlock('email');
  });

})();
