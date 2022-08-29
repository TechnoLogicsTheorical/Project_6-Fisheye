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

        if ( data.hasOwnProperty('image') ) {
            const mediaPath = `${basePathSourceMedia}/_thumbnails/${parsedName}/${data.image}`;

            const imageElement = document.createElement( 'img' );
            imageElement.setAttribute( 'src', mediaPath );
            imageElement.setAttribute( 'alt', `Photographie: ${title}`);

            return imageElement
        } else if ( data.hasOwnProperty('video') ) {
            const mediaPath = `${basePathSourceMedia}/${parsedName}/${data.video}`;

            const videoElement = document.createElement( 'video' );
            videoElement.muted = true;

            const sourceMedia = document.createElement( 'source' );
            sourceMedia.src = mediaPath;
            sourceMedia.type = "video/mp4";

            videoElement.appendChild(sourceMedia);

            return videoElement;
        }
    }

    function getCardDOM() {
        const mediaContainer = document.createElement( 'article' );
        mediaContainer.setAttribute( 'class', 'photographer-media');

        const embedMedia = (dispatchWithDifferentTypeMedia());
        embedMedia.addEventListener('click', function() {
            console.log('Perform action to open lightBox Modale')
        });

        mediaContainer.appendChild(embedMedia);

        const mediaTextContainer = document.createElement('div');

        const titleParagrapher = document.createElement('p');
        titleParagrapher.textContent = title;

        const buttonLikes = document.createElement('button');
        buttonLikes.textContent = numberOfLikes + ' ❤';

        mediaTextContainer.appendChild(titleParagrapher);
        mediaTextContainer.appendChild(buttonLikes);

        mediaContainer.appendChild(mediaTextContainer);

        return mediaContainer;
    }

    return { getCardDOM }

}