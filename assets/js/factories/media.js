class MediaFactory {
    constructor(data) {
        if ( data.hasOwnProperty('image') ) {
            return new ImageObject(data);
        } else if ( data.hasOwnProperty('video') ) {
            return new VideoObject(data);
        } else {
            throw 'Unknown type format';
        }
    }
}

class Media {
    constructor(data) {
        this._mediaID = data.id;
        this._photographerID = data.photographerId;
        this._titleMedia = data.title;
        this._likes = data.likes;
        this._date = data.date;

        this._basePathSourceMedia = 'assets/data/medias';
    }
}

class ImageObject extends Media {
/**
 *
 * @param {object} data Test
 */
    constructor(data) {
        super(data);
        this._imagePath = data.image;
    }

    createElement() {
        return `
        <article class="photographer-media">
            <img src="${this._basePathSourceMedia}/_thumbnails/${this._photographerID}/${this._imagePath}" alt="Photographie: ${this._titleMedia}">
            <div>
                <p>${this._titleMedia}</p>
                <button>${this._likes}</button>
            </div>
        </article>
        `;
    }
}

class VideoObject extends Media {
    constructor(data) {
        super(data);
        this._videoPath = data.video;
    }

    createElement() {
        return `
            <article class="photographer-media">
                <video muted>
                    <source src="${this._basePathSourceMedia}/${this._photographerID}/${this._videoPath}">
                </video>
                <div>
                    <p>${this._titleMedia}</p>
                    <button>${this._likes}</button>
                </div>
            </article>
        `;
    }
}