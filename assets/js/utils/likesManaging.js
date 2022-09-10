function calculateAllLikes(associedMedias) {
    let likes = 0;
    associedMedias.forEach(function (element) {
        likes += element.likes;
    });
    return likes;
}

function increaseTotalLikesEncart() {
    const totalLikesElement = document.querySelector('#bottom-informations p:first-child');
    let likes = totalLikesElement.textContent.split(' ')[0];
    likes = Number(likes);
    likes++;

    totalLikesElement.textContent = likes + ' ❤';
}

function attachListener() {
    const allButtonsLikes = document.querySelectorAll('.photographer-media button');
    allButtonsLikes.forEach( function (button) {
        button.addEventListener( 'click', function(event) {
            let element = event.target;
            if ( !(element.dataset.isLiked == 'true') ) {
                let likes = element.textContent.split(' ')[0];
                likes = Number(likes);
                likes++;

                element.textContent = likes + ' ❤';
                element.dataset.isLiked = 'true';
                increaseTotalLikesEncart();
            }
        })
    });
}