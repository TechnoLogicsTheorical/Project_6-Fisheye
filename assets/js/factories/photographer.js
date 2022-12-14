/**
 * @classdesc Classe d'un photographe, avec des propriétes privées et donnant accès à des méthodes spécifiques
 */
class Photographer {
    /**
     * @param {object} data Un objet avec ses propriétes brutes 
     * @return {object} Renvoie les méthodes de l'objet instancié.
     */
    constructor(data) {
        this._id = data.id;
        this._name = data.name;
        this._tagLine = data.tagline;
        this._price = data.price;

        this._profileURI = 'photographer.html?id=' + this._id;
        this._picturePath = `assets/data/photographers/${data.portrait}`;
        this._completedLocation = `${data.city}, ${data.country}`;
        this._benefitPricePerDays = `${this._price}€/jour`;
    }

    /**
     * Permet de récupérer la carte formatée pour la page d'accueil
     * @return {HTMLElement} Retourne une chaîne de caractére formatée
     */
    getCardDOM() {
        return `
            <article>
                <a href="${this._profileURI}" tabindex="0">
                    <img class="profile-image" src="${this._picturePath}" alt="Photographe: ${this._name}">
                    <h2>${this._name}</h2>
                </a>
                <div class="content-card" aria-label="Informations du Photographe" role="complementary">
                    <address aria-label="Localisation" tabindex="0">${this._completedLocation}</address>
                    <p aria-label="Slogan" tabindex="0">${this._tagLine}</p>
                    <p aria-label="Tarif Journalier de ${this._price}€ par jour" tabindex="0">${this._benefitPricePerDays}</p>
                </div>
            </article>
        `;
    }

    /**
     * @function Permet de récupérer la bannière formatée pour la page des photographes
     * @return {HTMLElement} Retourne une chaîne de caractére formatée
     */
    getBannerDOM() {
        return `
            <div class="photographer_informations" tabindex="0">
                <h1>${this._name}</h1>
                <address>${this._completedLocation}</address>
                <p>${this._tagLine}</p>
            </div>
            <button class="button" aria-label="Ouvrir la fenêtre de Contact" onClick="displayModal()">Contactez-moi</button>
            <img class="profile-image" src="${this._picturePath}" alt="Image du Photographe: ${this._name}" tabindex="0">
        `;
    }
}