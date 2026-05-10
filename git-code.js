(function () {

  function loadGitHub() {
    var container = document.getElementById('ghapidata');
    if (!container) return;

    container.innerHTML = '<div id="loader"><img width="80" height="80" src="css/loader.gif" alt="loading..."></div>';

    var userUrl  = 'https://api.github.com/users/pnaika';
    var reposUrl = 'https://api.github.com/users/pnaika/repos?per_page=100';

    Promise.all([
      fetch(userUrl).then(function (r) { return r.json(); }),
      fetch(reposUrl).then(function (r) { return r.json(); })
    ]).then(function (results) {
      var user  = results[0];
      var repos = results[1];

      var out = '<h3>' + user.name +
        ' <span class="smallname">(@<a href="' + user.html_url + '" target="_blank" rel="noopener noreferrer">' + user.login + '</a>)</span></h3>' +
        '<p>Followers: ' + user.followers +
        ' &nbsp;|&nbsp; Following: ' + user.following +
        ' &nbsp;|&nbsp; Public Repos: ' + user.public_repos +
        ' &nbsp;|&nbsp; Gists: ' + user.public_gists + '</p>';

      if (!Array.isArray(repos) || repos.length === 0) {
        out += '<p>No repositories found.</p>';
      } else {
        repos = repos
          .filter(function (r) { return !r.fork; })
          .sort(function (a, b) { return new Date(b.updated_at) - new Date(a.updated_at); });

        out += '<div style="width:100%;overflow:auto;">' +
          '<table class="table table-sm">' +
          '<thead><tr><th>Repo</th><th>Description</th><th>Language</th></tr></thead>' +
          '<tbody>';

        repos.forEach(function (repo) {
          out += '<tr>' +
            '<td><a href="' + repo.svn_url + '" target="_blank" rel="noopener noreferrer">' + repo.name + '</a></td>' +
            '<td>' + (repo.description || '—') + '</td>' +
            '<td>' + (repo.language   || '—') + '</td>' +
            '</tr>';
        });

        out += '</tbody></table></div>';
      }

      container.innerHTML = out;
    }).catch(function (err) {
      console.warn('GitHub API error:', err);
      container.innerHTML = '<p>Unable to load GitHub data. <a href="https://github.com/pnaika" target="_blank" rel="noopener noreferrer">View on GitHub</a>.</p>';
    });
  }

  function loadMedium() {
    var container = document.getElementById('mediumApiData');
    if (!container) return;

    container.innerHTML = '<div id="loader"><img width="80" height="80" src="css/loader.gif" alt="loading..."></div>';

    var url = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@prashanth17.naik';

    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (json) {
        var stories = json.items || [];
        var out = '<h3>' + json.feed.title +
          ' <span class="smallname">(@<a href="' + json.feed.link + '" target="_blank" rel="noopener noreferrer">prashanth17.naik</a>)</span></h3>';

        var filtered = stories
          .filter(function (s) { return s.categories && s.categories.length > 0; })
          .sort(function (a, b) { return new Date(b.pubDate) - new Date(a.pubDate); });

        if (filtered.length === 0) {
          out += '<p>No articles found. <a href="https://medium.com/@prashanth17.naik" target="_blank" rel="noopener noreferrer">Read on Medium</a>.</p>';
        } else {
          filtered.forEach(function (story) {
            out += '<div class="card" style="margin:5px 0 20px;padding:15px;">' +
              '<div class="card-body">' +
              '<h4 class="card-title">' + story.title + '</h4>' +
              '<div style="height:80px;overflow:hidden;">' + story.content + '</div>' +
              '<p style="margin-top:8px;"><span style="font-size:12px;font-weight:900;">CATEGORIES: </span>' +
              story.categories.join(', ') + '</p>' +
              '<a href="' + story.link + '" class="card-link" target="_blank" rel="noopener noreferrer">Read More…</a>' +
              '</div></div>';
          });
        }

        container.innerHTML = out;
      })
      .catch(function (err) {
        console.warn('Medium API error:', err);
        container.innerHTML = '<p>Unable to load articles. <a href="https://medium.com/@prashanth17.naik" target="_blank" rel="noopener noreferrer">Read on Medium</a>.</p>';
      });
  }

  // resume.js populates #ghapidata and #mediumApiData synchronously before
  // this async script runs, so the elements are guaranteed to be in the DOM.
  loadGitHub();
  loadMedium();

})();
