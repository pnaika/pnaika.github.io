$(function () {
    window.onload = function (e) {
        e.preventDefault();
        $('#ghapidata').html('<div id="loader"><img  width="80" height="80" src="css/loader.gif" alt="loading..."></div>');

        let requri = 'https://api.github.com/users/pnaika';
        let repouri = 'https://api.github.com/users/pnaika/repos';

        requestJSON(requri, function (json) {
            let fullname = json.name;
            let username = json.login;
            let profileurl = json.html_url;
            let followersnum = json.followers;
            let followingnum = json.following;
            let reposnum = json.public_repos;
            let reposGists = json.public_gists;

            if (!fullname) {
                fullname = username;
            }

            let outhtml = '<h3>' + fullname + ' <span class="smallname">(@<a href="' + profileurl + '" target="_blank">' + username + '</a>)</span></h3>';
            outhtml = outhtml + '<p>Followers: ' + followersnum + '; Following: ' + followingnum + '; Total Repositories: ' + reposnum + '; Gists ' + reposGists + '</p></div>';
            outhtml = outhtml + '<div class="repolist clearfix">';

            let repositories;
            $.getJSON(repouri, function (json) {
                repositories = json;
                outputPageContent();
            });

            function outputPageContent() {
                if (repositories.length == 0) {
                    outhtml = outhtml + '<p>No repos!</p></div>';
                } else {
                    repositories = repositories.sort((a, b) => b.size - a.size);

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
    }; // end click event handler

    function requestJSON(url, callback) {
        $.ajax({
            url: url,
            complete: function (xhr) {
                callback.call(null, xhr.responseJSON);
            }
        });
    }
});
