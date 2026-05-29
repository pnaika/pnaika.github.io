(function () {
  'use strict';
  if (typeof portfolioData === 'undefined') return;

  var d = portfolioData;
  var errors = [];

  function err(msg) { errors.push(msg); }

  function checkBullet(b, ctx) {
    if (typeof b === 'string') return;
    if (b && typeof b === 'object' && typeof b.text === 'string' && Array.isArray(b.lp)) return;
    err(ctx + ': must be a string or {text: string, lp: string[]}. Got: ' + JSON.stringify(b));
  }

  // Required top-level keys
  ['about', 'experience', 'education', 'skills', 'sideProjects', 'awards', 'recommendations'].forEach(function (key) {
    if (!d[key]) err('portfolioData.' + key + ' is missing');
  });

  // about shape
  if (d.about) {
    ['email', 'location'].forEach(function (key) {
      if (!d.about[key]) err('portfolioData.about.' + key + ' is missing');
    });
    if (!d.about.name || typeof d.about.name.first !== 'string' || typeof d.about.name.last !== 'string') {
      err('portfolioData.about.name must be {first: string, last: string}');
    }
  }

  // experience bullets — handles both string and {text, lp} forms
  (d.experience || []).forEach(function (job, ji) {
    var jctx = 'experience[' + ji + '] "' + (job.title || '?') + '"';
    (job.bullets || []).forEach(function (b, bi) {
      checkBullet(b, jctx + '.bullets[' + bi + ']');
    });
    (job.clients || []).forEach(function (client, ci) {
      (client.roles || []).forEach(function (role, ri) {
        var rctx = jctx + '.clients[' + ci + '].roles[' + ri + '] "' + (role.title || '?') + '"';
        (role.bullets || []).forEach(function (b, bi) {
          checkBullet(b, rctx + '.bullets[' + bi + ']');
        });
      });
    });
  });

  // skills.icons rows must have label
  (d.skills && d.skills.icons || []).forEach(function (row, ri) {
    row.forEach(function (icon, ii) {
      if (!icon.label) err('skills.icons[' + ri + '][' + ii + '] is missing a label');
    });
  });

  // awards must be strings
  (d.awards || []).forEach(function (a, i) {
    if (typeof a !== 'string') err('awards[' + i + '] must be a string. Got: ' + JSON.stringify(a));
  });

  if (errors.length) {
    console.group('%c⚠ portfolioData validation (' + errors.length + ' error' + (errors.length > 1 ? 's' : '') + ')', 'color:#e2531a;font-weight:bold');
    errors.forEach(function (e) { console.warn(e); });
    console.groupEnd();
  }
})();
