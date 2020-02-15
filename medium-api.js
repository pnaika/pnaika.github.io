$(function () {
    window.onload = function (e) {
        e.preventDefault();
        // $('#ghapidata').html('<div id="loader"><img  width="80" height="80" src="css/loader.gif" alt="loading..."></div>');

        let requri = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@prashanth17.naik';

        requestJSON(requri, function (json) {
            // let userInfo = json.payload.user;
            // let collectionInfo = json.payload.references.Post;
            // let SocialStats = json.payload.references.SocialStats;


            console.log(json);
            // let followersnum = json.followers;
            // let followingnum = json.following;
            // let reposnum = json.public_repos;
            // let reposGists = json.public_gists;
            //
            // if (!fullname) {
            //     fullname = username;
            // }
            //
            // let outhtml = '<h3>' + fullname + ' <span class="smallname">(@<a href="' + profileurl + '" target="_blank">' + username + '</a>)</span></h3>';
            // outhtml = outhtml + '<p>Followers: ' + followersnum + '; Following: ' + followingnum + '; Total Repositories: ' + reposnum + '; Gists ' + reposGists + '</p></div>';
            // outhtml = outhtml + '<div class="repolist clearfix">';
            //
            // let repositories;
            // $.getJSON(repouri, function (json) {
            //     repositories = json;
            //     outputPageContent();
            // });

            // function outputPageContent() {
            //     if (repositories.length == 0) {
            //         outhtml = outhtml + '<p>No repos!</p></div>';
            //     } else {
            //         repositories = repositories.sort((a, b) => b.size - a.size);
            //
            //         outhtml = outhtml + '<table class="table">\n' +
            //             '    <thead>\n' +
            //             '    <tr>\n' +
            //             '        <th scope="col">Repo Name</th>\n' +
            //             '        <th scope="col">Description</th>\n' +
            //             '        <th scope="col">Language</th>\n' +
            //             '    </tr>\n' +
            //             '    </thead>\n' +
            //             '    <tbody>';
            //         $.each(repositories, function (index) {
            //             if (!repositories[index].fork) {
            //                 outhtml = outhtml +
            //                     '<tr>\n' +
            //                     '        <td><a href="' + repositories[index].url +'" target="_blank">' + repositories[index].name + '</a></td>\n' +
            //                     '        <td>' +  repositories[index].description  + '</td>\n' +
            //                     '        <td>' + repositories[index].language  + '</td>\n' +
            //                     '    </tr>';
            //             }
            //         });
            //         outhtml = outhtml + '</tbody>\n' +
            //             '</table>';
            //     }
            //     // $('#ghapidata').html(outhtml);
            // }
        });
    };

    function requestJSON(url, callback) {
        $.ajax({
            url: url,
            headers: {  'Access-Control-Allow-Origin': '*' },
            complete: function (xhr) {
                callback.call(null, xhr.responseJSON);
            }
        });
    }
});
