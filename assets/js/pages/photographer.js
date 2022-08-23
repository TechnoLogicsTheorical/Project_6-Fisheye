function getPhotographerID() {
    let actualURL = new URL(window.location);
    // Récuperer le paramètre id fourni dans l'url
    let photographerID = actualURL.searchParams.get('id');

    return Number(photographerID);
}

function displayData(photographer, associedMedias) {
    const mainSection = document.getElementById( 'main' );

    // Générer la Bannière d'entête
    const photographerModel = photographerFactory(photographer);
    const bannerDOM = photographerModel.getBannerDOM();
    mainSection.appendChild(bannerDOM);

    // Géneration du conteneur des images
    const mediaSectionContainer = document.createElement( 'section' );
    mediaSectionContainer.setAttribute( 'class', 'medias-container' );

    // Création de toutes les cartes images
    associedMedias.forEach(function (mediaElement) {
        const photographerName = photographerModel.namePhotographer;

        const mediaModel = mediaFactory(mediaElement, photographerName);
        const mediaCard = mediaModel.getCardDOM()

        mediaSectionContainer.appendChild(mediaCard);
    });
    mainSection.appendChild(mediaSectionContainer);

    // Création de l'encart
    const extraInformationsContainer = document.createElement( 'div' );
    extraInformationsContainer.setAttribute('id', 'bottom-informations');
    extraInformationsContainer.innerHTML = `<p>${photographerModel.benefitPricePerDays}</p>`;
    mainSection.appendChild(extraInformationsContainer)
};


async function init() {
    const PHOTOGRAPHER_ID = getPhotographerID();

    // Récupère toutes les données issues de la fonction Fetch qui renvoie un objet
    const {
        photographer: PHOTOGRAPHER,
        mediasAssocied: ASSOCIED_MEDIAS,
    } = await getDatasWithID(PHOTOGRAPHER_ID);

    displayData(PHOTOGRAPHER, ASSOCIED_MEDIAS);
};

init();