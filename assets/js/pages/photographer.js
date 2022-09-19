// -----------------------   Déclarations de Fonctions   ---------------------------
/**
 * Récupère l'identifiant du photographer transmis au sein de l'URL de navigateur dans le paramètre [?id=4563]
 * @return {number} Retourne un nombre : Ex [4563]
 */
function getPhotographerID() {
    const actualURL = new URL(window.location);
    const photographerID = actualURL.searchParams.get('id');

    return Number(photographerID);
}

/**
 * Affiche les données par l'appel de différents procédée factorielle de génération et de formatage de données
 * @param {object} photographer Un objet contenant toutes les informations du Photographe
 */
function displayData(photographer) {
    const bannerContainer = document.getElementById('photograph-header');
    // Générer la Bannière d'entête
    const photographerModel = createPhotographer(photographer);
    bannerContainer.innerHTML = photographerModel.getBannerDOM();
}

function displayMedias(associedMedias) {
    mediaSectionContainer.innerHTML = "";
    // Création de toutes les cartes images
    associedMedias.forEach(function (mediaElement) {
        const mediaModel = new MediaFactory(mediaElement);
        const mediaCard = mediaModel.createElement();

        mediaSectionContainer.innerHTML += mediaCard;
    });
    mainSection.appendChild(mediaSectionContainer);
}

function initSelectButton(associedMedias) {
    selectOptionsSort.addEventListener('change', (event) => {
       switch (event.target.value) {
           case 'date':
               associedMedias.sort( (currentElement, nextElement) => {
                   return new Date(currentElement.date) - new Date(nextElement.date);
               });
               break;
           case 'title':
               associedMedias.sort( (currentElement, nextElement) => {
                   return (currentElement.title > nextElement.title) ? 1 : -1 ;
               });
               break;
           case 'popularity':
               associedMedias.sort( (currentElement, nextElement) => {
                   return (currentElement.likes < nextElement.likes) ? 1 : -1;
               });
               break;
       }
       displayMedias(associedMedias);
       attachListenerLikes();
       initLightBox();
    });
}

function createEncart(benefitPricePerDays, totalLikes) {
    const extraInformationsContainer = document.createElement( 'div' );
    extraInformationsContainer.id = 'bottom-informations';
    extraInformationsContainer.innerHTML = `<h3>${totalLikes} ❤</h3>`;
    extraInformationsContainer.innerHTML += `<h3>${benefitPricePerDays}€ / jour</h3>`;
    mainSection.appendChild(extraInformationsContainer);
}

// ____________________________________________________________________________________
async function init() {
    const PHOTOGRAPHER_ID = getPhotographerID();

    // Récupère toutes les données issues de la fonction Fetch qui renvoie un objet
    const {
        photographer: PHOTOGRAPHER,
        mediasAssocied: ASSOCIED_MEDIAS,
    } = await getDataWithID(PHOTOGRAPHER_ID);

    displayData(PHOTOGRAPHER);
    initSelectButton(ASSOCIED_MEDIAS);

    // Trie par défaut le tableau
    ASSOCIED_MEDIAS.sort( (currentElement, nextElement) => {
        return (currentElement.likes < nextElement.likes) ? 1 : -1;
    });
    displayMedias(ASSOCIED_MEDIAS);

    const totalLikes = calculateAllLikes(ASSOCIED_MEDIAS);
    createEncart(PHOTOGRAPHER.price, totalLikes);
    createModalContact(PHOTOGRAPHER.name);

    attachListenerLikes();

    initLightBox();
}

init();