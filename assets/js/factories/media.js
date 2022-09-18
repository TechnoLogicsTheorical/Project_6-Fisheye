class MediaFactory {
    /**
     * Classe d'usine qui permet de choisir en fonction de la donnée existance, le bonne instanciation de l'objet
     * @param {object} data La donnée du média
     * @return {Media} Retourne un Objet avec les propriètes et méthodes instanciées
     */
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
    constructor(data) {
        super(data);
        this._imagePath = data.image;
    }

    createElement() {
        return `
        <article class="photographer-media">
            <img src="${this._basePathSourceMedia}/${this._photographerID}/${this._imagePath}" alt="${this._titleMedia}">
            <div>
                <h2>${this._titleMedia}</h2>
                <button>${this._likes} ♡</button>
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
                    <h2>${this._titleMedia}</h2>
                    <button>${this._likes} ♡</button>
                </div>
            </article>
        `;
    }
}