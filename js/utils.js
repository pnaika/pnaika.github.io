/**
 * Shared utilities for all pages.
 * Exposed as window.Utils — no build step required.
 */
var Utils = (function () {

  function formatDate(str) {
    var d = new Date(str);
    return isNaN(d) ? str : d.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  function readTime(html) {
    var words = (html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200)) + ' min read';
  }

  function slugFromUrl(url) {
    return (url || '').split('/').pop().split('?')[0];
  }

  /**
   * Wire up a theme toggle button.
   * @param {string} btnId   - id of the <button>
   * @param {boolean} hasLabel - whether the button contains a <span> label
   */
  function initThemeToggle(btnId, hasLabel) {
    var btn = document.getElementById(btnId);
    if (!btn) return;
    var icon  = btn.querySelector('i');
    var label = hasLabel ? btn.querySelector('span') : null;

    function apply(dark) {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      if (icon)  icon.className    = dark ? 'fas fa-sun' : 'fas fa-moon';
      if (label) label.textContent = dark ? 'Light mode' : 'Dark mode';
    }

    apply(document.documentElement.getAttribute('data-theme') === 'dark');

    btn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
      apply(!isDark);
    });

    return apply;
  }

  return { formatDate, readTime, slugFromUrl, initThemeToggle };
})();
