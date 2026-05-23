(function () {
  'use strict';

  var d = window.portfolioData;
  if (!d) return;

  var overlay  = document.getElementById('terminal-overlay');
  var outputEl = document.getElementById('term-output');
  var inputEl  = document.getElementById('term-input');
  var closeBtn = document.getElementById('term-close');
  var toggleBtn = document.getElementById('term-toggle');
  if (!overlay || !outputEl || !inputEl) return;

  var cmdHistory = [];
  var histIdx    = -1;

  var PS1 = '<span class="p-user">prashanth</span>' +
            '<span class="p-at">@</span>' +
            '<span class="p-host">portfolio</span>' +
            '<span class="p-sym">:~$ </span>';

  // ─── Open / close ──────────────────────────────────────────────────────────

  function openTerm() {
    overlay.classList.add('is-open');
    setTimeout(function () { inputEl.focus(); }, 50);
  }

  function closeTerm() {
    overlay.classList.remove('is-open');
  }

  // ─── Output helpers ────────────────────────────────────────────────────────

  function line(html, cls) {
    var el = document.createElement('div');
    el.className = 'term-line' + (cls ? ' ' + cls : '');
    el.innerHTML = html;
    outputEl.appendChild(el);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function txt(s, cls) { line(esc(s), cls || 'term-out'); }
  function dim(s)       { line(esc(s), 'term-dim'); }
  function blank()      { line('&nbsp;'); }
  function head(s)      { line('<span class="term-head">' + esc(s) + '</span>'); }

  function echo(raw) {
    line('<span class="term-prompt">' + PS1 + '</span>' +
         '<span class="term-cmd-echo">' + esc(raw) + '</span>');
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function pad(s, n) {
    s = String(s);
    while (s.length < n) s += ' ';
    return s;
  }

  function stripTags(s) { return (s || '').replace(/<[^>]+>/g, ''); }

  // ─── Commands ──────────────────────────────────────────────────────────────

  function cmdHelp() {
    blank();
    head('Available commands');
    var cmds = [
      ['whoami',         'Quick bio'],
      ['ls',             'List portfolio sections'],
      ['cat about',      'Full about section'],
      ['cat experience', 'Work history'],
      ['cat skills',     'Tech stack & tools'],
      ['cat projects',   'Side projects'],
      ['cat education',  'Education'],
      ['cat contact',    'Contact info & social links'],
      ['open blog',      'Open blog (new tab)'],
      ['open resume',    'Open resume (new tab)'],
      ['clear',          'Clear screen  (Ctrl+L)'],
      ['exit',           'Close terminal  (Esc)'],
    ];
    cmds.forEach(function (c) {
      line('<span class="term-accent">' + pad(c[0], 18) + '</span>' +
           '<span class="term-dim">' + esc(c[1]) + '</span>');
    });
    blank();
    dim('Tip: ↑/↓ for history · Tab to autocomplete');
    blank();
  }

  function cmdWhoami() {
    var a = d.about;
    var yrs = new Date().getFullYear() - a.careerStartYear;
    blank();
    line('<span class="term-accent">' + esc(a.name.first + ' ' + a.name.last) + '</span>');
    txt(a.taglines[0] + '  ·  ' + a.location);
    blank();
    txt(a.resumeSummary);
    blank();
    line('<span class="term-dim">Run </span><span class="term-accent">cat about</span>' +
         '<span class="term-dim"> for full bio, or </span><span class="term-accent">cat experience</span>' +
         '<span class="term-dim"> for work history.</span>');
    blank();
  }

  function cmdLs() {
    blank();
    var dirs  = ['about', 'experience', 'education', 'skills', 'projects', 'contact'];
    var files = ['resume.pdf', 'blog.html'];
    line('<span class="term-accent">drwxr-xr-x  </span>' +
         dirs.map(function (s) {
           return '<span class="term-out">' + esc(s) + '/</span>';
         }).join('  '));
    line('<span class="term-accent">-rw-r--r--  </span>' +
         files.map(function (f) {
           return '<span class="term-dim">' + esc(f) + '</span>';
         }).join('  '));
    blank();
    dim('cat <name>  to read a section, e.g.  cat about');
    blank();
  }

  function cmdAbout() {
    var a = d.about;
    var yrs = new Date().getFullYear() - a.careerStartYear;
    blank();
    head('about.txt');
    txt('Name     : ' + a.name.first + ' ' + a.name.last);
    txt('Title    : ' + a.taglines[0]);
    txt('Location : ' + a.location);
    txt('Email    : ' + a.email);
    txt('Exp      : ' + yrs + '+ years');
    blank();
    a.bio.forEach(function (p) { txt(stripTags(p)); blank(); });
  }

  function cmdExperience() {
    blank();
    head('experience.log');
    d.experience.forEach(function (job) {
      blank();
      line('<span class="term-accent">' + esc(job.title) + '</span>' +
           '<span class="term-dim">  @  ' + esc(job.company) + '  [' + esc(job.period) + ']</span>');

      if (job.clients) {
        job.clients.forEach(function (client) {
          client.roles.forEach(function (role) {
            line('<span class="term-dim">  ' + esc(role.title) + '</span>');
            (role.bullets || []).forEach(function (b) {
              txt('    · ' + stripTags(b));
            });
          });
        });
      } else {
        (job.bullets || []).forEach(function (b) {
          txt('  · ' + stripTags(b));
        });
      }
    });
    blank();
  }

  function cmdSkills() {
    var s = d.skills;
    blank();
    head('skills.json');
    if (s.other && s.other.length) {
      blank();
      line('<span class="term-accent">Tools & Tech</span>');
      for (var i = 0; i < s.other.length; i += 4) {
        txt('  ' + s.other.slice(i, i + 4).join('  ·  '));
      }
    }
    if (s.workflow && s.workflow.length) {
      blank();
      line('<span class="term-accent">Workflow</span>');
      s.workflow.forEach(function (w) { txt('  ✓  ' + w); });
    }
    blank();
  }

  function cmdProjects() {
    blank();
    head('projects/');
    d.sideProjects.forEach(function (p) {
      blank();
      line('<span class="term-accent">' + esc(p.name) + '</span>  ' +
           '<span class="term-link" data-href="' + esc(p.url) + '">[open ↗]</span>');
      if (p.description) txt('  ' + p.description);
      if (p.stack)       txt('  Stack: ' + p.stack);
    });
    blank();
  }

  function cmdEducation() {
    blank();
    head('education.txt');
    d.education.forEach(function (s) {
      blank();
      line('<span class="term-accent">' + esc(s.school) + '</span>' +
           '<span class="term-dim">  [' + esc(s.period) + ']</span>');
      txt('  ' + s.degree);
      if (s.track) txt('  ' + s.track);
      txt('  GPA: ' + s.gpa);
    });
    blank();
  }

  function cmdContact() {
    var a = d.about;
    blank();
    head('contact.sh');
    txt('email    : ' + a.email);
    txt('location : ' + a.location);
    blank();
    line('<span class="term-accent">Social</span>');
    a.social.forEach(function (s) {
      if (s.external && s.url && s.url.startsWith('http')) {
        line('  <span class="term-out">' + pad(s.label, 12) + '</span>' +
             '<span class="term-link" data-href="' + esc(s.url) + '">' + esc(s.url) + '</span>');
      }
    });
    blank();
  }

  function cmdOpenBlog() {
    window.open('blog.html', '_blank');
    txt('Opening blog...');
  }

  function cmdOpenResume() {
    window.open(d.about.resumeUrl, '_blank');
    txt('Opening resume...');
  }

  function cmdClear() { outputEl.innerHTML = ''; }

  // ─── Command table ─────────────────────────────────────────────────────────

  var CMDS = {
    'help':            cmdHelp,
    'whoami':          cmdWhoami,
    'ls':              cmdLs,
    'cat about':       cmdAbout,
    'cat experience':  cmdExperience,
    'cat skills':      cmdSkills,
    'cat projects':    cmdProjects,
    'cat education':   cmdEducation,
    'cat contact':     cmdContact,
    'contact':         cmdContact,
    'open blog':       cmdOpenBlog,
    'open resume':     cmdOpenResume,
    'clear':           cmdClear,
    'exit':            closeTerm,
    'pwd':  function() { txt('/home/prashanth/portfolio'); },
    'date': function() { txt(new Date().toString()); },
    'uname':function() { txt('PortfolioOS 1.0.0 Darwin x86_64'); },
    'echo': function(arg) { txt(arg || ''); },
    'man':  function() {
      txt('No manual entry. Try: help');
    },
  };

  var CMD_KEYS = Object.keys(CMDS);

  // ─── Command runner ────────────────────────────────────────────────────────

  function run(raw) {
    var input = raw.trim();
    if (!input) return;

    echo(input);

    var lower = input.toLowerCase();
    if (CMDS[lower]) {
      var arg = input.slice(lower.indexOf(' ') + 1 || input.length);
      CMDS[lower](arg);
      return;
    }

    line('<span class="term-err">bash: ' + esc(lower) + ': command not found</span>');
    dim('Type  help  to see available commands.');
  }

  // ─── Keyboard handling ─────────────────────────────────────────────────────

  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var val = inputEl.value;
      inputEl.value = '';
      if (val.trim()) { cmdHistory.unshift(val); histIdx = -1; }
      run(val);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < cmdHistory.length - 1) { inputEl.value = cmdHistory[++histIdx]; }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) { inputEl.value = cmdHistory[--histIdx]; }
      else { histIdx = -1; inputEl.value = ''; }
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      var partial = inputEl.value.toLowerCase();
      if (!partial) return;
      var matches = CMD_KEYS.filter(function (k) { return k.startsWith(partial); });
      if (matches.length === 1) {
        inputEl.value = matches[0];
      } else if (matches.length > 1) {
        echo(inputEl.value);
        dim(matches.join('   '));
      }
      return;
    }
    if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); cmdClear(); }
  });

  // ─── Clickable links in output ─────────────────────────────────────────────

  outputEl.addEventListener('click', function (e) {
    var el = e.target.closest('[data-href]');
    if (el) window.open(el.getAttribute('data-href'), '_blank');
  });

  // ─── Global key bindings ───────────────────────────────────────────────────

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeTerm();
      return;
    }
    if (e.key === '`' && !overlay.classList.contains('is-open')) {
      var active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;
      e.preventDefault();
      openTerm();
    }
  });

  if (closeBtn)  closeBtn.addEventListener('click', closeTerm);
  if (toggleBtn) toggleBtn.addEventListener('click', openTerm);

  // ─── Welcome banner ────────────────────────────────────────────────────────

  (function printWelcome() {
    var banner = [
      '┌─────────────────────────────────────────────────────────────┐',
      '│  pnaika.sh  —  interactive CLI portfolio                    │',
      '│  Prashanth Naika · Software Development Manager · Amazon    │',
      '└─────────────────────────────────────────────────────────────┘',
    ];
    banner.forEach(function (l) { line('<span class="term-dim">' + esc(l) + '</span>'); });
    blank();
    line('<span class="term-dim">Type </span><span class="term-accent">help</span>' +
         '<span class="term-dim"> to see available commands. ' +
         'Press </span><span class="term-accent">Esc</span>' +
         '<span class="term-dim"> or run </span><span class="term-accent">exit</span>' +
         '<span class="term-dim"> to close.</span>');
    blank();
  })();

})();
