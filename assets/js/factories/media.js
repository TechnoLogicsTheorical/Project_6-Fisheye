class MediaFactory {
    /**
     * Classe d'usine qui permet de choisir en fonction de la donnée existance, le bonne instanciation de l'objet
     * @param {object} data Un objet avec les propriètes brutes
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

/**
 * @classdesc Classe maitresse afin de ne pas ce repétées au sein des différents types d'objets
 */
class Media {
    /**
     * @param {object} data Un objet avec les propriètes brutes
     */
    constructor(data) {
        this._mediaID = data.id;
        this._photographerID = data.photographerId;
        this._titleMedia = data.title;
        this._likes = data.likes;
        this._date = data.date;

        this._basePathSourceMedia = 'assets/data/medias';
    }
}

/**
 * @classdesc Classe qui génére un objet de Type Image formatant les données brutes.
 */
class ImageObject extends Media {
    /** Le constructor est héritée de la classe maîtraisse
     * @param {object} data Un objet avec les données brutes
     */
    constructor(data) {
        super(data);
        this._imagePath = data.image;
    }

    /**
     * Génére un Element HTML formatée avec les propriètes privées des différents construteurs
     * @return {HTMLElement} Retourne une chaine de caractére formatée pour le HTML
     */
    createElement() {
        return `
        <article class="photographer-media" >
            <img src="${this._basePathSourceMedia}/${this._photographerID}/${this._imagePath}" alt="${this._titleMedia}" tabindex="0">
            <div>
                <h2 tabindex="0" aria-label="Titre du média : ${this._titleMedia}">${this._titleMedia}</h2>
                <button aria-label="${this._likes} likes" tabindex="0">${this._likes} ♡</button>
            </div>
        </article>
        `;
    }
}

/**
 * @classdesc Classe qui génére un objet de Type Video formatant les données brutes.
 */
class VideoObject extends Media {
    /** Le constructor est héritée de la classe maîtraisse
     * @param {object} data Un objet avec les données brutes
     */
    constructor(data) {
        super(data);
        this._videoPath = data.video;
    }

    /**
     * Génére un Element HTML formatée avec les propriètes privées des différents construteurs
     * @return {HTMLElement} Retourne une chaine de caractére formatée pour le HTML
     */
    createElement() {
        return `
            <article class="photographer-media" tabindex="0">
                <video muted autoplay loop title="${this._titleMedia}" aria-label="Un média vidéo" tabindex="0">
                    <source src="${this._basePathSourceMedia}/${this._photographerID}/${this._videoPath}" >
                </video>
                <div>
                    <h2 tabindex="0" aria-label="Titre du média : ${this._titleMedia}">${this._titleMedia}</h2>
                    <button aria-label="${this._likes} likes" tabindex="0">${this._likes} ♡</button>
                </div>
            </article>
        `;
    }
}