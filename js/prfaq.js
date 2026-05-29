/* =============================================================
   PR/FAQ Overlay — Amazon "Working Backwards" document mode
   Depends on: portfolioData (data.js loaded before this script)
   ============================================================= */

(function () {
  'use strict';

  // ── Helpers ──────────────────────────────────────────────────

  function stripHtml(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  function firstSentence(text) {
    var match = text.match(/^.*?[.!?](?:\s|$)/);
    return match ? match[0].trim() : text;
  }

  /* Minimal HTML escaper */
  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function faqItem(question, answerHtml) {
    return [
      '    <p class="prfaq-q">Q: ' + escHtml(question) + '</p>',
      '    <p class="prfaq-a">A: ' + answerHtml + '</p>'
    ].join('\n');
  }

  // ── Build overlay HTML ────────────────────────────────────────

  function buildOverlay() {
    var d   = portfolioData;
    var a   = d.about;
    var exp = d.experience[0];
    var edu = d.education[0];

    var fullName = a.name.first + ' ' + a.name.last;
    var years    = new Date().getFullYear() - a.careerStartYear;
    var company  = exp.company;
    var location = a.location;

    // Date string
    var months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
    var now    = new Date();
    var dateStr = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();

    // Bio paragraphs (strip HTML)
    var bio0 = a.bio[0] ? stripHtml(a.bio[0]) : '';
    var bio1 = a.bio[1] ? stripHtml(a.bio[1]) : '';
    var bio2 = a.bio[2] ? stripHtml(a.bio[2]) : '';

    // Recommendations
    var rec0     = d.recommendations[0] || {};
    var rec0Text = rec0.text ? stripHtml(rec0.text[0]) : '';
    var rec1     = d.recommendations[1] || {};
    var rec1Text = rec1.text ? firstSentence(stripHtml(rec1.text[0])) : '';

    // Skills
    var skillsList = (d.skills && d.skills.other) ? d.skills.other.join(', ') : '';

    // Education
    var eduName   = edu.degree ? edu.degree + ' from ' + edu.school : edu.school;
    var eduDetail = eduName +
      (edu.gpa    ? ', GPA ' + edu.gpa    : '') +
      (edu.period ? ' (' + edu.period + ')' : '');

    // Social — find LinkedIn
    var linkedInUrl = '';
    if (a.social) {
      for (var i = 0; i < a.social.length; i++) {
        if (a.social[i].label === 'LinkedIn') { linkedInUrl = a.social[i].url; break; }
      }
    }
    var contactAnswer = linkedInUrl
      ? 'Connect on LinkedIn: <a href="' + linkedInUrl + '" target="_blank" rel="noopener noreferrer">' + linkedInUrl + '</a>'
      : 'Reach out by email at <a href="mailto:' + a.email + '">' + a.email + '</a>';

    // ── Assemble HTML ─────────────────────────────────────────

    var html = [
      '<button id="prfaq-close" aria-label="Close PR/FAQ view">&times;</button>',
      '<div class="prfaq-doc" role="document">',

      /* Header */
      '  <div class="prfaq-header">',
      '    <span class="prfaq-header-label">Amazon Internal &mdash; For Discussion Only</span>',
      '  </div>',

      /* Release tag + headline */
      '  <div class="prfaq-release-tag">For Immediate Release</div>',
      '  <h1 class="prfaq-headline">',
      '    ' + escHtml(fullName) + ' Brings ' + years + '+ Years of Engineering',
      '    Excellence to Lead ' + escHtml(company) + ' Software Development',
      '  </h1>',
      '  <p class="prfaq-dateline"><em>' + escHtml(location) + ' &ndash; ' + dateStr + ' &ndash;</em></p>',

      /* Body */
      '  <p>' + escHtml(bio0) + '</p>',
      '  <p>' + escHtml(bio1) + '</p>',

      /* Pull quote */
      '  <blockquote class="prfaq-quote">',
      '    <p>&ldquo;' + escHtml(rec0Text) + '&rdquo;</p>',
      '    <cite>&mdash; ' + escHtml(rec0.name || '') + '</cite>',
      '  </blockquote>',

      '  <p>' + escHtml(bio2) + '</p>',

      /* Separator */
      '  <p class="prfaq-hash">###</p>',

      /* Boilerplate */
      '  <div class="prfaq-boilerplate">',
      '    <strong>About ' + escHtml(fullName) + '</strong><br>',
      '    ' + escHtml(a.resumeSummary),
      '  </div>',

      /* FAQ */
      '  <div class="prfaq-faq">',
      '    <h2>Frequently Asked Questions</h2>',

      faqItem(
        'What is ' + a.name.first + '’s current role?',
        escHtml(exp.title) + ' at ' + escHtml(exp.company) +
          (exp.period ? ' (' + escHtml(exp.period) + ').' : '.')
      ),

      faqItem(
        'How many years of experience does ' + a.name.first + ' have?',
        a.name.first + ' has ' + years + '+ years of professional software engineering ' +
          'and technical leadership experience, with a career beginning in ' + a.careerStartYear + '.'
      ),

      faqItem(
        'What technologies does ' + a.name.first + ' specialize in?',
        a.name.first + ' specializes in React, Angular, TypeScript, and AWS, ' +
          'and also works with: ' + escHtml(skillsList) + '.'
      ),

      faqItem(
        'What are ' + a.name.first + '’s academic credentials?',
        escHtml(eduDetail) + '.'
      ),

      faqItem(
        'What do colleagues say about ' + a.name.first + '?',
        '&ldquo;' + escHtml(rec1Text) + '&rdquo; &mdash; ' + escHtml(rec1.name || '')
      ),

      faqItem(
        'How can I get in touch?',
        contactAnswer
      ),

      '  </div>', // .prfaq-faq
      '</div>'    // .prfaq-doc
    ].join('\n');

    return html;
  }

  // ── Lifecycle ────────────────────────────────────────────────

  var overlay;
  var _firstOpen = true;

  function openOverlay() {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (_firstOpen) {
      _firstOpen = false;
      window.Achievement && window.Achievement.unlock('prfaq');
    }
  }

  function closeOverlay() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // ── Init ─────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof portfolioData === 'undefined') {
      console.warn('[prfaq] portfolioData not found — overlay not initialised.');
      return;
    }

    overlay = document.createElement('div');
    overlay.id = 'prfaq-overlay';
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'PR/FAQ document view');
    overlay.innerHTML = buildOverlay();
    document.body.appendChild(overlay);

    /* Close button */
    overlay.querySelector('#prfaq-close').addEventListener('click', closeOverlay);

    /* Click outside .prfaq-doc */
    overlay.addEventListener('click', function (e) {
      if (!e.target.closest('.prfaq-doc')) { closeOverlay(); }
    });

    /* Escape key */
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && overlay.classList.contains('is-open')) {
        closeOverlay();
      }
    });

    /* External trigger */
    document.addEventListener('open-prfaq', openOverlay);
  });

}());
