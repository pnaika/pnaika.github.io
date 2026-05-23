(function () {
  var MEDIUM_USER = 'prashanth17.naik';
  var RSS2JSON    = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@' + MEDIUM_USER;

  var slug = new URLSearchParams(location.search).get('slug') || '';

  // ── Theme toggle ────────────────────────────────────────────────────────────
  var themeBtn = document.getElementById('bp-theme-toggle');
  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeBtn) themeBtn.querySelector('i').className = dark ? 'fas fa-sun' : 'fas fa-moon';
  }
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
      applyTheme(!isDark);
    });
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function show(id)  { var el = document.getElementById(id); if (el) el.style.display = ''; }
  function hide(id)  { var el = document.getElementById(id); if (el) el.style.display = 'none'; }
  function setText(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }
  function setHTML(id, val) { var el = document.getElementById(id); if (el) el.innerHTML   = val; }

  function readTime(html) {
    var words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200)) + ' min read';
  }

  function formatDate(str) {
    var d = new Date(str);
    return isNaN(d) ? str : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderPost(post) {
    document.title = post.title + ' — Prashanth Naika';
    document.getElementById('page-title').textContent = post.title + ' — Prashanth Naika';

    var catEl = document.getElementById('bp-categories');
    if (catEl && post.categories && post.categories.length) {
      catEl.innerHTML = post.categories
        .map(function (c) { return '<span class="bp-tag">' + c + '</span>'; })
        .join('');
    }

    setText('bp-title', post.title);
    setText('bp-date',  formatDate(post.pubDate || post.pub_date || ''));
    setText('bp-read-time', readTime(post.content || ''));

    var medLink = document.getElementById('bp-medium-link');
    if (medLink) medLink.href = post.link || '#';

    // Strip leading h1/h2 duplicate title that Medium embeds in content
    var content = (post.content || '')
      .replace(/^[\s\S]*?<h[12][^>]*>[\s\S]*?<\/h[12]>\s*/i, '');

    // Make all images responsive
    content = content.replace(/<img /g, '<img style="max-width:100%;height:auto;" ');

    // Open external links in new tab
    content = content.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');

    setHTML('bp-content', content);

    hide('bp-loading');
    show('bp-article');
  }

  function showError() {
    hide('bp-loading');
    show('bp-error');
  }

  // ── Load post — try cached JSON first, fall back to rss2json ───────────────
  function loadFromCache() {
    return fetch('posts/' + slug + '.json')
      .then(function (r) {
        if (!r.ok) throw new Error('not cached');
        return r.json();
      });
  }

  function loadFromRss() {
    return fetch(RSS2JSON)
      .then(function (r) { return r.json(); })
      .then(function (json) {
        var items = json.items || [];
        var post  = items.find(function (item) {
          return item.link && item.link.split('/').pop().split('?')[0] === slug;
        });
        if (!post) throw new Error('not found');
        return post;
      });
  }

  if (!slug) { showError(); return; }

  loadFromCache()
    .catch(loadFromRss)
    .then(renderPost)
    .catch(showError);

})();
