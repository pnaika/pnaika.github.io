(function () {
  var MEDIUM_USER  = 'prashanth17.naik';
  var RSS2JSON     = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@' + MEDIUM_USER;
  var POSTS_INDEX  = 'data/posts/index.json';
  var POSTS_DIR    = 'data/posts/';

  var slug = new URLSearchParams(location.search).get('slug') || '';

  // ── Theme ──────────────────────────────────────────────────────────────────
  Utils.initThemeToggle('bp-theme-toggle', false);

  // ── DOM helpers ────────────────────────────────────────────────────────────
  function show(id)       { var el = document.getElementById(id); if (el) el.style.display = ''; }
  function hide(id)       { var el = document.getElementById(id); if (el) el.style.display = 'none'; }
  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  function setHTML(id, v) { var el = document.getElementById(id); if (el) el.innerHTML   = v; }

  // ── Shared data cache ──────────────────────────────────────────────────────
  var _allPosts = null;

  function getAllPosts() {
    if (_allPosts) return Promise.resolve(_allPosts);

    return fetch(POSTS_INDEX)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (data && data.posts && data.posts.length) {
          _allPosts = data.posts;
          return _allPosts;
        }
        throw new Error('no index');
      })
      .catch(function () {
        return fetch(RSS2JSON)
          .then(function (r) { return r.json(); })
          .then(function (json) {
            _allPosts = (json.items || [])
              .filter(function (s) { return s.categories && s.categories.length; })
              .map(function (s) {
                return {
                  title:      s.title,
                  slug:       Utils.slugFromUrl(s.link),
                  link:       s.link,
                  pubDate:    s.pubDate,
                  thumbnail:  s.thumbnail || '',
                  categories: s.categories,
                };
              });
            return _allPosts;
          });
      });
  }

  // ── Blog list ──────────────────────────────────────────────────────────────
  function renderList(posts) {
    document.title = 'Blog — Prashanth Naika';

    var html = posts.map(function (p) {
      var url  = 'blog.html?slug=' + p.slug;
      var tags = (p.categories || []).slice(0, 3)
        .map(function (c) { return '<span class="bp-tag">' + c + '</span>'; })
        .join('');

      return '<a href="' + url + '" class="bl-card">' +
        (p.thumbnail
          ? '<div class="bl-thumb-wrap"><img class="bl-thumb" src="' + p.thumbnail + '" alt="" loading="lazy"></div>'
          : '<div class="bl-thumb-wrap bl-thumb-placeholder"><i class="fab fa-medium"></i></div>') +
        '<div class="bl-card-body">' +
          '<div class="bl-tags">' + tags + '</div>' +
          '<h3 class="bl-title">' + p.title + '</h3>' +
          '<div class="bl-meta">' + Utils.formatDate(p.pubDate) + '</div>' +
        '</div>' +
      '</a>';
    }).join('');

    setHTML('bl-grid', html || '<p class="bl-empty">No posts found.</p>');
    hide('bp-loading');
    show('bl-list');
  }

  // ── Blog post ──────────────────────────────────────────────────────────────
  function renderPost(post, allPosts) {
    document.title = post.title + ' — Prashanth Naika';

    // Categories
    var catEl = document.getElementById('bp-categories');
    if (catEl) {
      catEl.innerHTML = (post.categories || [])
        .map(function (c) { return '<span class="bp-tag">' + c + '</span>'; })
        .join('');
    }

    setText('bp-title', post.title);
    setText('bp-date',  Utils.formatDate(post.pubDate || post.pub_date || ''));
    setText('bp-read-time', Utils.readTime(post.content || ''));

    var medLink = document.getElementById('bp-medium-link');
    if (medLink) medLink.href = post.link || '#';

    // Clean content
    var content = (post.content || '')
      .replace(/^[\s\S]*?<h[12][^>]*>[\s\S]*?<\/h[12]>\s*/i, '')
      .replace(/<img /g, '<img style="max-width:100%;height:auto;" ')
      .replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');

    setHTML('bp-content', content);

    // Next / previous
    if (allPosts && allPosts.length) {
      var idx  = allPosts.findIndex(function (p) { return p.slug === slug; });
      var prev = idx > 0              ? allPosts[idx - 1] : null;  // newer
      var next = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;  // older

      var navEl = document.getElementById('bp-post-nav');
      if (navEl) {
        navEl.innerHTML =
          '<div class="bp-nav-prev">' +
            (next
              ? '<a href="blog.html?slug=' + next.slug + '">' +
                  '<span class="bp-nav-label">← Older</span>' +
                  '<span class="bp-nav-title">' + next.title + '</span>' +
                '</a>'
              : '') +
          '</div>' +
          '<div class="bp-nav-next">' +
            (prev
              ? '<a href="blog.html?slug=' + prev.slug + '">' +
                  '<span class="bp-nav-label">Newer →</span>' +
                  '<span class="bp-nav-title">' + prev.title + '</span>' +
                '</a>'
              : '') +
          '</div>';
      }
    }

    hide('bp-loading');
    show('bp-article');
  }

  function showError() {
    hide('bp-loading');
    show('bp-error');
  }

  function loadPost() {
    var fromCache = fetch(POSTS_DIR + slug + '.json')
      .then(function (r) {
        if (!r.ok) throw new Error('not cached');
        return r.json();
      });

    Promise.all([
      fromCache.catch(function () {
        return fetch(RSS2JSON)
          .then(function (r) { return r.json(); })
          .then(function (json) {
            var post = (json.items || []).find(function (item) {
              return Utils.slugFromUrl(item.link) === slug;
            });
            if (!post) throw new Error('not found');
            return post;
          });
      }),
      getAllPosts().catch(function () { return null; })
    ])
      .then(function (results) { renderPost(results[0], results[1]); })
      .catch(showError);
  }

  // ── Entry point ────────────────────────────────────────────────────────────
  if (slug) {
    hide('bl-list');
    loadPost();
  } else {
    hide('bp-article');
    hide('bp-error');
    getAllPosts().then(renderList).catch(function () {
      hide('bp-loading');
      setHTML('bl-list', '<p class="bl-empty">Unable to load posts. <a href="https://medium.com/@' + MEDIUM_USER + '" target="_blank" rel="noopener noreferrer">Read on Medium ↗</a></p>');
      show('bl-list');
    });
  }

})();
