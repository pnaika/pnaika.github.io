$(function () {
    window.onload = function (e) {
        e.preventDefault();
        $('#ghapidata').html('<div id="loader"><img  width="80" height="80" src="css/loader.gif" alt="loading..."></div>');
        $('#mediumApiData').html('<div id="loader"><img  width="80" height="80" src="css/loader.gif" alt="loading..."></div>');

        let requri = 'https://api.github.com/users/pnaika';
        let repouri = 'https://api.github.com/users/pnaika/repos';
        let mediumUri = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@prashanth17.naik';

        requestGitJSON(requri,  (json) => {
            let fullname = json.name;
            let username = json.login;
            let profileurl = json.html_url;
            let followersnum = json.followers;
            let followingnum = json.following;
            let reposnum = json.public_repos;
            let reposGists = json.public_gists;

            let outhtml = '<h3>' + fullname + ' <span class="smallname">(@<a href="' + profileurl + '" target="_blank">' + username + '</a>)</span></h3>';
            outhtml = outhtml + '<p>Followers: ' + followersnum + '; Following: ' + followingnum + '; Total Repositories: ' + reposnum + '; Gists ' + reposGists + '</p></div>';
            outhtml = outhtml + '<div class="repolist clearfix" style="width: 100%;overflow: auto;">';

            let repositories;
            $.getJSON(repouri, function (json) {
                repositories = json;
                outputPageContent();
            });

            function outputPageContent() {
                if (repositories.length == 0) {
                    outhtml = outhtml + '<p>No repos!</p></div>';
                } else {
                    repositories = repositories.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

                    outhtml = outhtml + '<table class="table">\n' +
                        '    <thead>\n' +
                        '    <tr>\n' +
                        '        <th scope="col">Repo Name</th>\n' +
                        '        <th scope="col">Description</th>\n' +
                        '        <th scope="col">Language</th>\n' +
                        '    </tr>\n' +
                        '    </thead>\n' +
                        '    <tbody>';
                    $.each(repositories, function (index) {
                        if (!repositories[index].fork) {
                            outhtml = outhtml +
                                '<tr>\n' +
                                '        <td><a href="' + repositories[index].svn_url +'" target="_blank">' + repositories[index].name + '</a></td>\n' +
                                '        <td>' +  repositories[index].description  + '</td>\n' +
                                '        <td>' + repositories[index].language  + '</td>\n' +
                                '    </tr>';
                        }
                    });
                    outhtml = outhtml + '</tbody>\n' +
                        '</table>';
                }
                $('#ghapidata').html(outhtml);
            } // end outputPageContent()
        }); // end requestJSON Ajax call

        requestMediumJSON(mediumUri, (json) => {
            console.log('Medium Data', json);

            let stories = json.items;

            let outhtml = '<h3>' + json.feed.title + ' <span class="smallname">(@<a href="' + json.feed.link + '" target="_blank">prashanth17.naik</a>)</span></h3>';

            if (stories.length == 0) {
                outhtml = outhtml + '<p>Api Failed! <a target="_blank" href="https://medium.com/@prashanth17.naik">Click here</a>' +
                    'to read medium articles</p></div>';
            } else {
                stories = stories.sort((a, b) => b.pubDate - a.pubDate);

                $.each(stories, (index) => {
                    if (stories[index].categories && stories[index].categories.length > 0) {
                        outhtml = outhtml +
                            '<div class="card" style="margin: 5px 0 20px 0;padding: 15px;"' +
                            '    <div class="card-body">\n' +
                            '        <h4 class="card-title">' + stories[index].title + '</h4>\n' +
                            '        <div style="height: 80px; width: auto;overflow: hidden"> ' + stories[index].content  + '</div>' +
                            '        <p> <span style="font-size: 12px;font-weight: 900;">CATEGORIES: </span>' + stories[index].categories.join(', ') + '</p>'+
                            '        <a href="'+ stories[index].link +'" class="card-link" target="_blank">Read More...</a>\n' +
                            '    </div>' +
                            '</div>';
                    }

                });

                $('#mediumApiData').html(outhtml);
            }
        })
    }; // end click event handler

    function requestGitJSON(url, callback) {
        $.ajax({
            url: url,
            complete: function (xhr) {
                callback.call(null, xhr.responseJSON);
            }
        }).catch((err) => {
            console.log('Error in git stuff', err)
        });
    }

    function requestMediumJSON(url, callback) {
        $.ajax({
            type: "GET",
            url: url,
            xhrFields: {
                withCredentials: false
            },
            complete: function (xhr) {
                callback.call(null, xhr.responseJSON);
            }
        }).catch((err) => {
            console.log('Error in medium stuff', err)
        });
    }
});
