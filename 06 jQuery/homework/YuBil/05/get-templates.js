// Supports:
// - 'card' template;
// - 'not-found' template; 
function getTemplates(data, type) {

    switch(type) {
        case 'card': 
            return (`
            <div class="p-5 border rounded border-primary text-center text-muted">
                <a href="${data.profileUrl}" target="_blank"><img class="rounded-circle mb-2" src="${data.avaUrl}" 
                    width="80" height="80" alt="${data.userName}"></a>
                <h2 class="mb-2">
                    ${data.fullName} (@<a href="${data.profileUrl}" target="_blank">${data.userName}</a>)
                </h2>
                <p class="mb-2">
                    Followers: ${data.followersNum} # Following: ${data.followingNum} # Repos: ${data.reposNum}
                </p>
                <p class="mb-2">
                    createdDate at: ${data.createdDate}
                </p>
            </div>
            <div class="clearfix">'
        `);

        case 'not-found':
            return (`
                <div class="alert alert-danger" role="alert">User ${data.userName} not found!</div>
            `);
    }
}