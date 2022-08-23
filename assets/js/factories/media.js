function mediaFactory(data, photographerName) {
    /*
        {
            "id": 342550,
            "photographerId": 82,
            "title": "Fashion Yellow Beach",
            "image": "Fashion_Yellow_Beach.jpg",
            "likes": 62,
            "date": "2011-12-08",
            "price": 55
        },
     */
    const {
        id: imageID,
        title,
        likes: numberOfLikes,

        parsedName = photographerName.split(' ')[0],
        basePathSourceMedia = 'assets/data/medias',
    } = data;

    function dispatchWithDifferentTypeMedia() {
        let generatedElement = null;

        if ( data.hasOwnProperty('image') ) {
            const mediaPath = `${basePathSourceMedia}/_thumbnails/${parsedName}/${data.image}`
            generatedElement = `<img src="${mediaPath}" alt="Photographie: ${title}">`
        } else if ( data.hasOwnProperty('video') ) {
            const mediaPath = `${basePathSourceMedia}/${parsedName}/${data.video}`
            generatedElement = `<video muted><source src="${mediaPath}" type="video/mp4"></video>`
        }

        return generatedElement;
    }

    function getCardDOM() {
        const mediaContainer = document.createElement( 'article' );
        mediaContainer.setAttribute( 'class', 'photographer-media');

        mediaContainer.innerHTML =
        `
        ${dispatchWithDifferentTypeMedia()}
        <div>
            <p>${title}</p>
            <button>${numberOfLikes} ❤</button>
        </div>
        `;

        return (mediaContainer)
    }

    return { getCardDOM }

}