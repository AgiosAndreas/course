function getTemplate(data) {

    var fullName   = data.name;
    var userName   = data.login;
    var avaUrl     = data.avatar_url;
    var profileUrl = data.html_url;
    var followersNum = data.followers;
    var followingNum = data.following;
    var reposNum     = data.public_repos;
    var createdDate  = data.created_at.substring(0,10);

    if (fullName == undefined) { 
        fullName = userName; 
    }
    
    return (`
        <div class="p-5 border rounded border-primary text-center text-muted">
            <a href="${profileUrl}" target="_blank"><img class="rounded-circle mb-2" src="${avaUrl}" 
                width="80" height="80" alt="${userName}"></a>
            <h2 class="mb-2">
                ${fullName} (@<a href="${profileUrl}" target="_blank">${userName}</a>)
            </h2>
            <p class="mb-2">
                Followers: ${followersNum} # Following: ${followingNum} # Repos: ${reposNum}
            </p>
            <p class="mb-2">
                createdDate at: ${createdDate}
            </p>
        </div>
        <div class="clearfix">'
    `);
}