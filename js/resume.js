(function () {
  'use strict';

  // ─── HTML builder ────────────────────────────────────────────────────────────

  function tag(name, attrs, inner) {
    var attrStr = '';
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] !== undefined && attrs[k] !== null) {
          attrStr += ' ' + k + '="' + attrs[k] + '"';
        }
      });
    }
    return '<' + name + attrStr + '>' + (inner !== undefined ? inner : '') + '</' + name + '>';
  }

  function bullets(list) {
    if (!list || !list.length) return '';
    return tag('ul', {}, list.map(function (b) { return tag('li', {}, b); }).join(''));
  }

  function linkedInBadge(url, name) {
    return tag('a', { class: 'subheading', target: '_blank', href: url, rel: 'noopener noreferrer' },
      name + ' ' +
      tag('span', { class: 'fa-stack' },
        tag('i', { class: 'fas fa-circle fa-stack-2x' }) +
        tag('i', { class: 'fab fa-linkedin-in fa-stack-1x fa-inverse' })
      )
    );
  }

  function companyLogo(job) {
    if (!job.logo) return '';
    var cls = job.logoStyle === 'long' ? 'company-avtar-long' : 'company-avtar';
    return tag('img', { class: cls, src: job.logo, alt: job.logoAlt });
  }

  // ─── Section renderers ───────────────────────────────────────────────────────

  function renderAbout(data) {
    var yearsExp = new Date().getFullYear() - data.careerStartYear;

    var bio = data.bio.map(function (p) {
      return tag('p', { class: 'mb-5' }, p.replace('class="years-exp"', 'class="years-exp">' + yearsExp + '<x style="display:none"'));
    }).join('');

    // simpler: replace the placeholder span entirely
    bio = data.bio.map(function (p) {
      return tag('p', { class: 'mb-5' }, p.replace('<strong class="years-exp"></strong>', tag('strong', {}, yearsExp)));
    }).join('');

    var socialLinks = data.social.map(function (s) {
      var attrs = { href: s.url, style: 'color:' + (s.brandColor || 'var(--color-accent)'), title: s.label };
      if (s.external) { attrs.target = '_blank'; attrs.rel = 'noopener noreferrer'; }
      return tag('li', { class: 'list-inline-item' },
        tag('a', attrs, tag('i', { class: s.icon }))
      );
    }).join('');

    return tag('div', { class: 'my-auto' },
      tag('h1', { class: 'mb-0' },
        data.name.first + ' ' + tag('span', { class: 'text-primary' }, data.name.last)
      ) +
      (data.taglines && data.taglines.length
        ? tag('div', { class: 'tagline-wrapper mb-3' },
            tag('span', { id: 'tagline', class: 'text-primary tagline-text' }) +
            tag('span', { class: 'tagline-cursor' }, '|')
          )
        : '') +
      tag('div', { class: 'subheading mb-5' },
        data.location + ' &nbsp;·&nbsp; ' +
        tag('a', { href: 'mailto:' + data.email }, data.email) + ' ' +
        tag('button', { class: 'copy-email-btn', 'data-email': data.email, title: 'Copy email address' },
          tag('i', { class: 'far fa-copy' })
        )
      ) +
      bio +
      tag('h6', {},
        tag('i', { class: 'fas fa-file-lines' }) + ' ' +
        tag('a', { class: 'resume-pdf', href: data.resumeUrl, target: '_blank', rel: 'noopener noreferrer' },
          'View / Download Resume'
        )
      ) +
      '<br>' +
      tag('ul', { class: 'list-inline list-social-icons mb-0' }, socialLinks)
    );
  }

  function renderExperience(jobs) {
    var items = jobs.map(function (job) {
      var logoHtml = companyLogo(job);
      var companyHtml = job.logoStyle === 'long'
        ? tag('a', { href: job.companyUrl, target: '_blank', rel: 'noopener noreferrer' }, logoHtml)
        : logoHtml + tag('a', { href: job.companyUrl, target: '_blank', rel: 'noopener noreferrer' }, job.company);

      var content = tag('h3', { class: 'mb-0' }, job.title) +
        tag('div', { class: 'subheading mb-3' }, companyHtml);

      if (job.clients) {
        content += job.clients.map(function (client) {
          var clientLogo = tag('img', { class: 'company-avtar-long', src: client.logo, alt: client.logoAlt });
          var clientLink = tag('a', { href: client.url, target: '_blank', rel: 'noopener noreferrer' }, clientLogo);
          var rolesHtml = client.roles.map(function (role) {
            return tag('h6', {}, role.title) + bullets(role.bullets);
          }).join('');
          return tag('h5', { class: 'mb-3' }, 'Client: ' + clientLink) + rolesHtml;
        }).join('');
      } else {
        content += bullets(job.bullets);
      }

      return tag('div', { class: 'resume-item d-flex flex-column flex-md-row mb-5' },
        tag('div', { class: 'resume-content me-auto' }, content) +
        tag('div', { class: 'resume-date text-md-end' },
          tag('span', { class: 'text-primary' }, job.period)
        )
      );
    }).join('');

    return tag('div', { class: 'my-auto' },
      tag('h2', { class: 'mb-5' }, 'Experience') + items
    );
  }

  function renderEducation(schools) {
    var items = schools.map(function (school, i) {
      var isLast = i === schools.length - 1;
      var logoClass = school.logoStyle === 'university' ? 'uni-avtar-long' : 'company-avtar';
      var logoHtml = tag('img', { class: logoClass, src: school.logo, alt: school.logoAlt });
      var heading = school.logoStyle === 'avatar'
        ? logoHtml + ' ' + school.school
        : logoHtml;

      return tag('div', { class: 'resume-item d-flex flex-column flex-md-row' + (isLast ? '' : ' mb-5') },
        tag('div', { class: 'resume-content me-auto' },
          tag('h3', { class: 'mb-0' }, heading) +
          tag('div', { class: 'subheading mb-3' }, school.degree) +
          (school.track ? tag('div', {}, school.track) : '') +
          tag('p', {}, 'GPA: ' + school.gpa)
        ) +
        tag('div', { class: 'resume-date text-md-end' },
          tag('span', { class: 'text-primary' }, school.period)
        )
      );
    }).join('');

    return tag('div', { class: 'my-auto' },
      tag('h2', { class: 'mb-5' }, 'Education') + items
    );
  }

  function renderSkills(skills) {
    var iconRows = skills.icons.map(function (row) {
      var items = row.map(function (skill) {
        return tag('li', { class: 'list-inline-item' },
          tag('a', {
            class: 'alert-link',
            'data-bs-toggle': 'tooltip',
            'data-bs-placement': 'top',
            'data-bs-title': skill.label,
            target: '_blank',
            href: skill.url,
            rel: 'noopener noreferrer'
          }, tag('i', { class: skill.icon }))
        );
      }).join('');
      return tag('ul', { class: 'list-inline list-icons' }, items);
    }).join('');

    var otherTools = tag('ul', { class: 'fa-ul mb-0' },
      skills.other.map(function (tool) {
        return tag('li', {},
          tag('span', { class: 'fa-li' }, tag('i', { class: 'fas fa-star' })) + tool
        );
      }).join('')
    );

    var workflow = tag('ul', { class: 'fa-ul mb-0' },
      skills.workflow.map(function (item) {
        return tag('li', {},
          tag('span', { class: 'fa-li' }, tag('i', { class: 'fas fa-check' })) + item
        );
      }).join('')
    );

    return tag('div', { class: 'my-auto' },
      tag('h2', { class: 'mb-5' }, 'Skills') +
      tag('div', { class: 'subheading mb-3' }, 'Programming Languages &amp; Tools') +
      iconRows +
      tag('div', { class: 'subheading mb-3 mt-3' }, 'Other Tools') +
      otherTools +
      '<br>' +
      tag('div', { class: 'subheading mb-3' }, 'Workflow') +
      workflow
    );
  }

  function renderSideProjects(projects) {
    var items = projects.map(function (p) {
      var link = tag('a', { target: '_blank', href: p.url, rel: 'noopener noreferrer' }, p.name);
      var desc = p.stack
        ? tag('div', {},
            tag('p', {}, 'Active Developer and Creator of ' + link + '. ' + p.description) +
            tag('div', { style: 'font-size: 12px' },
              tag('h6', {}, 'Tech Stack:') + ' ' + p.stack
            )
          )
        : tag('p', {}, 'Writing ' + link + ' articles. ' + p.description);

      return tag('li', {},
        tag('span', { class: 'fa-li' }, tag('i', { class: 'fas fa-check' })) + desc
      );
    }).join('');

    return tag('div', { class: 'my-auto' },
      tag('h2', { class: 'mb-5' }, 'Side Projects') +
      tag('ol', { class: 'fa-ul mb-0' }, items)
    );
  }

  function renderGithub(data) {
    var npmLinks = data.npmContributions.map(function (lib) {
      return tag('a', { href: lib.url, target: '_blank', rel: 'noopener noreferrer' }, lib.name);
    }).join(', ');

    return tag('div', { class: 'my-auto' },
      tag('h2', { class: 'mb-5' }, 'GitHub') +
      tag('div', { id: 'w' }, tag('div', { id: 'ghapidata', class: 'clearfix' })) +
      tag('div', {},
        tag('h6', { class: 'mb-2' }, 'Public npm Libraries') +
        tag('p', {}, 'Contribution to ' + npmLinks + '.')
      )
    );
  }

  function renderBlogs() {
    return tag('div', { class: 'my-auto' },
      tag('h2', { class: 'mb-5' }, 'Blogs') +
      tag('div', { class: 'fa-ul mb-0' },
        tag('div', { id: 'mediumApiData', class: 'clearfix' })
      )
    );
  }

  function renderRecommendations(recs) {
    var items = recs.map(function (r) {
      var paras = r.text.map(function (t) { return tag('p', {}, t); }).join('');
      return tag('div', { class: 'recommendation-item' },
        linkedInBadge(r.linkedIn, r.name) + paras
      );
    }).join('');

    return tag('div', { class: 'my-auto' },
      tag('h2', { class: 'mb-5' }, 'What do my coworkers have to say?') + items
    );
  }

  function renderAwards(awards) {
    var items = awards.map(function (a) {
      return tag('li', {},
        tag('span', { class: 'fa-li' }, tag('i', { class: 'fas fa-trophy text-warning' })) +
        tag('p', {}, a)
      );
    }).join('');

    return tag('div', { class: 'my-auto' },
      tag('h2', { class: 'mb-5' }, 'Awards &amp; Certifications') +
      tag('ul', { class: 'fa-ul mb-0' }, items)
    );
  }

  function renderInterests(data) {
    var gearList = tag('ul', {},
      data.gear.map(function (g) { return tag('li', {}, g); }).join('')
    );

    var links = data.links.map(function (l, i) {
      var attrs = { href: l.url };
      if (l.external) { attrs.target = '_blank'; attrs.rel = 'noopener noreferrer'; }
      var separator = i < data.links.length - 1 ? ' | ' : '';
      return tag('li', { class: 'list-inline-item' },
        tag('a', attrs, tag('i', { class: l.icon }) + ' ' + l.label) + separator
      );
    }).join('');

    return tag('div', { class: 'my-auto' },
      tag('h2', { class: 'mb-5' }, 'Interests and Hobbies') +
      tag('h4', {}, data.headline) +
      tag('p', {}, data.description) +
      tag('h5', {}, 'Devices Used') +
      gearList +
      tag('ul', { class: 'list-inline list-icons subheading-pics' }, links)
    );
  }

  // ─── Populate sections ───────────────────────────────────────────────────────

  function populate(id, html) {
    var node = document.getElementById(id);
    if (node) node.innerHTML = html;
  }

  var d = portfolioData;
  populate('about',           renderAbout(d.about));
  populate('experience',      renderExperience(d.experience));
  populate('education',       renderEducation(d.education));
  populate('skills',          renderSkills(d.skills));
  populate('sideProjects',    renderSideProjects(d.sideProjects));
  populate('blogs',           renderBlogs());
  populate('github',          renderGithub(d.github));
  populate('recommendations', renderRecommendations(d.recommendations));
  populate('awards',          renderAwards(d.awards));
  populate('interests',       renderInterests(d.interests));

  // ─── Bootstrap tooltips (after DOM is populated) ─────────────────────────────

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (tooltipEl) {
    new bootstrap.Tooltip(tooltipEl);
  });

  // ─── Smooth scroll + close mobile nav ────────────────────────────────────────

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a.js-scroll-trigger');
    if (!link) return;
    var href = link.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    var navCollapse = document.getElementById('navbarSupportedContent');
    if (navCollapse && navCollapse.classList.contains('show')) {
      var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });

  // ─── Typewriter animation ────────────────────────────────────────────────────

  var taglineEl = document.getElementById('tagline');
  if (taglineEl && d.about.taglines && d.about.taglines.length) {
    var twTexts = d.about.taglines, twIdx = 0, twChar = 0, twDeleting = false;
    function twTick() {
      var text = twTexts[twIdx];
      taglineEl.textContent = text.slice(0, twChar);
      if (!twDeleting) {
        if (++twChar > text.length) { twDeleting = true; setTimeout(twTick, 1800); return; }
        setTimeout(twTick, 75);
      } else {
        if (--twChar === 0) { twDeleting = false; twIdx = (twIdx + 1) % twTexts.length; }
        setTimeout(twTick, 40);
      }
    }
    twTick();
  }

  // ─── Copy email ───────────────────────────────────────────────────────────────

  var copyBtn = document.querySelector('.copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = this.getAttribute('data-email');
      navigator.clipboard.writeText(email).then(function () {
        var toast = document.getElementById('copy-toast');
        if (toast) { toast.classList.add('show'); setTimeout(function () { toast.classList.remove('show'); }, 2200); }
      });
    });
  }

  // ─── Reading progress bar ────────────────────────────────────────────────────

  var progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      var total    = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    }, { passive: true });
  }

  // ─── Scroll-to-top button ────────────────────────────────────────────────────

  var scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Mode dropdown ────────────────────────────────────────────────────────

  var THEME_ICONS  = { light: 'fas fa-sun', dark: 'fas fa-moon', retro: 'fas fa-tv', matrix: 'fas fa-code', newspaper: 'fas fa-newspaper' };
  var THEME_LABELS = { light: 'Light', dark: 'Dark', retro: 'Retro / CRT', matrix: 'Matrix', newspaper: 'Newspaper' };

  var modeNavIcon   = document.getElementById('mode-nav-icon');
  var modeNavLabel  = document.getElementById('mode-nav-label');
  var modeMobBtn    = document.getElementById('mode-btn-mob');
  var modeDropdowns = document.querySelectorAll('.mode-dd');
  var modeItems     = document.querySelectorAll('.mode-list li');

  var currentTheme = null;

  function applyTheme(theme) {
    if (!THEME_ICONS[theme]) theme = 'light';
    if (currentTheme === 'matrix' && theme !== 'matrix') {
      document.dispatchEvent(new CustomEvent('matrix-stop'));
    }
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (modeNavIcon)  modeNavIcon.className           = THEME_ICONS[theme];
    if (modeNavLabel) modeNavLabel.textContent         = THEME_LABELS[theme];
    if (modeMobBtn)   modeMobBtn.querySelector('i').className = THEME_ICONS[theme];
    modeItems.forEach(function (item) {
      item.classList.toggle('is-active', item.getAttribute('data-mode') === theme);
    });
    if (theme === 'matrix') document.dispatchEvent(new CustomEvent('matrix-start'));
    if (window.Achievement) {
      if (theme === 'dark')      window.Achievement.unlock('dark');
      if (theme === 'retro')     window.Achievement.unlock('retro');
      if (theme === 'matrix')    window.Achievement.unlock('matrix');
      if (theme === 'newspaper') window.Achievement.unlock('newspaper');
    }
  }

  function closeAllDropdowns() {
    modeDropdowns.forEach(function (dd) { dd.classList.remove('is-open'); });
  }

  modeDropdowns.forEach(function (dd) {
    var btn = dd.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = dd.classList.contains('is-open');
      closeAllDropdowns();
      if (!wasOpen) dd.classList.add('is-open');
    });
  });

  modeItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var mode = item.getAttribute('data-mode');
      closeAllDropdowns();
      if (mode === 'terminal') {
        document.dispatchEvent(new CustomEvent('open-terminal'));
      } else if (mode === 'snake') {
        document.dispatchEvent(new CustomEvent('open-snake'));
      } else if (mode === 'prfaq') {
        document.dispatchEvent(new CustomEvent('open-prfaq'));
      } else {
        localStorage.setItem('theme', mode);
        applyTheme(mode);
      }
    });
  });

  document.addEventListener('click', closeAllDropdowns);

  applyTheme(localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme') || 'light');

  // ─── Active nav link via Intersection Observer ───────────────────────────────

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('#sideNav .nav-link');

  if (sections.length && navLinks.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  // Visitor counter
  var vcEl = document.getElementById('visitor-count');
  if (vcEl) {
    fetch('visitor-count.json?v=' + Date.now())
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.total_uniques) return;
        var n = data.total_uniques.toLocaleString();
        vcEl.innerHTML = '<i class="far fa-eye"></i> ' + n + ' visitors';
      })
      .catch(function () {});
  }

})();
