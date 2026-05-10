(function () {
  'use strict';

  var d = portfolioData;
  var a = d.about;

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
    return tag('ul', {}, list.map(function (b) {
      return tag('li', {}, b);
    }).join(''));
  }

  // ── Header ──────────────────────────────────────────────────────────────
  var linkedInUrl = 'https://www.linkedin.com/in/prashanthnaika';
  var contactParts = [
    a.location,
    tag('a', { href: 'mailto:' + a.email }, a.email),
    a.phone,
    tag('a', { href: linkedInUrl, target: '_blank', rel: 'noopener noreferrer' }, 'linkedin.com/in/prashanthnaika'),
    tag('a', { href: 'https://prashanthpnaika.com', target: '_blank', rel: 'noopener noreferrer' }, 'prashanthpnaika.com')
  ].filter(Boolean).join(' &nbsp;&bull;&nbsp; ');

  // ── Experience ───────────────────────────────────────────────────────────
  function renderJob(job) {
    var bodyHtml = '';

    if (job.clients) {
      bodyHtml = job.clients.map(function (client) {
        var rolesHtml = client.roles.map(function (role) {
          return tag('div', { class: 'role' },
            tag('div', { class: 'role-title' }, role.title) +
            bullets(role.bullets)
          );
        }).join('');
        return tag('div', { class: 'client' },
          tag('div', { class: 'client-name' }, 'Client: ' + client.name) +
          rolesHtml
        );
      }).join('');
    } else {
      bodyHtml = bullets(job.bullets);
    }

    return tag('div', { class: 'job' },
      tag('div', { class: 'job-header' },
        tag('span', { class: 'job-title' }, job.title) +
        tag('span', { class: 'job-company' }, job.company) +
        tag('span', { class: 'job-period' }, job.period)
      ) +
      bodyHtml
    );
  }

  // ── Education ────────────────────────────────────────────────────────────
  function renderSchool(school) {
    return tag('div', { class: 'edu-item' },
      tag('div', { class: 'edu-header' },
        tag('span', { class: 'edu-school' }, school.school) +
        tag('span', { class: 'edu-period' }, school.period)
      ) +
      tag('div', { class: 'edu-degree' },
        school.degree + (school.track ? ' &mdash; ' + school.track : '')
      ) +
      tag('div', { class: 'edu-gpa' }, 'GPA: ' + school.gpa)
    );
  }

  // ── Skills ───────────────────────────────────────────────────────────────
  var techSkills = d.skills.icons
    .reduce(function (acc, row) { return acc.concat(row); }, [])
    .map(function (s) { return s.label; })
    .concat(d.skills.other)
    .join(' &middot; ');

  var workflow = d.skills.workflow.join(' &middot; ');

  // ── Side projects (code-only, skip blog articles) ────────────────────────
  var projectItems = d.sideProjects
    .filter(function (p) { return p.stack; })
    .map(function (p) {
      return tag('li', {},
        tag('strong', {}, p.name) +
        ' (' + p.stack + ') &mdash; ' + p.description
      );
    }).join('');

  // ── Build HTML ───────────────────────────────────────────────────────────
  var html =
    tag('header', {},
      tag('h1', {}, a.name.first + ' ' + a.name.last) +
      tag('div', { class: 'contact' }, contactParts)
    ) +

    tag('section', {},
      tag('h2', {}, 'Summary') +
      tag('p', {}, a.resumeSummary)
    ) +

    tag('section', {},
      tag('h2', {}, 'Experience') +
      d.experience.map(renderJob).join('')
    ) +

    tag('section', {},
      tag('h2', {}, 'Education') +
      d.education.map(renderSchool).join('')
    ) +

    tag('section', {},
      tag('h2', {}, 'Technical Skills') +
      tag('p', {}, techSkills) +
      tag('p', { class: 'workflow' },
        tag('strong', {}, 'Workflow: ') + workflow
      )
    ) +

    (projectItems
      ? tag('section', {},
          tag('h2', {}, 'Side Projects') +
          tag('ul', {}, projectItems)
        )
      : '') +

    tag('section', {},
      tag('h2', {}, 'Awards &amp; Achievements') +
      tag('ul', {}, d.awards.map(function (item) {
        return tag('li', {}, item);
      }).join(''))
    );

  document.getElementById('resume').innerHTML = html;
})();
