/**
 * Récupère l'identifiant du photographer transmis au sein de l'URL de navigateur dans le paramètre [?id=4563]
 * @return {number} Retourne un nombre : Ex [4563]
 */
function getPhotographerID() {
    let actualURL = new URL(window.location);
    // Récuperer le paramètre id fourni dans l'url
    let photographerID = actualURL.searchParams.get('id');

    return Number(photographerID);
}

/**
 * Affiche les données par l'appel de différents procédée factorielle de génération et de formatage de données
 * @param {object} photographer Un objet contenant toutes les informations du Photographe
 * @param {[object]} associedMedias Un tableau d'objet contenant tous les médias associées du Photographe
 */
function displayData(photographer, associedMedias) {
    const mainSection = document.getElementById( 'main' );

    // Générer la Bannière d'entête
    const photographerModel = photographerFactory(photographer);
    const bannerDOM = photographerModel.getBannerDOM();
    mainSection.appendChild(bannerDOM);

    // Géneration du conteneur des médias (images & videos)
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
    mainSection.appendChild(extraInformationsContainer);

    // Création de la modale de contact
    const contactModal = document.createElement( 'div' );
    contactModal.setAttribute( 'id', 'contact_modal');

    contactModal.innerHTML =
    `
        <div class="modal">
            <header>
                <h2>Contactez-moi<br>${photographerModel.namePhotographer}</h2>
                <img src="assets/images/static/icons/close.svg" onclick="closeModal()" />
            </header>
        </div>
    `;

    const formInputsContainer = document.createElement( 'form' );
    formInputsContainer.innerHTML =
    `
    <div>
        <label for="firstName">Prénom</label>
        <input id="firstName" name="firstName" type="text" placeholder="John" autofocus required/>
    </div>
    
    <div>
        <label for="lastName">Nom</label>
        <input id="lastName" name="lastName" type="text" placeholder="DOE" required/>
    </div>
    
    <div>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" placeholder="john.doe@email.com" required/>
    </div>
    
    <div>
        <label for="message">Email</label>
        <textarea id="message" name="message" required></textarea>
    </div>
    
    <button class="button contact_button" type="submit">Envoyer</button>
    `;

    formInputsContainer.addEventListener('submit', function(event){
        event.preventDefault();
        event.stopImmediatePropagation();

        const dataForm = new FormData(formInputsContainer);
        console.info('Affichage des données du Formulaire:')
        console.log('______________________________________________')


        for ( [key,value] of dataForm.entries() ) {
            console.log('Input Formulaire:' + key, 'Valeur du champ:' + value);
            console.log('----------------------------------------------------------------')
        }
    });

    // Ajouter le contenu inputs dans la modal
    contactModal.querySelector('.modal').appendChild(formInputsContainer);

    mainSection.after(contactModal);

    // -------------------------------------------------------------------------------------------
    // Création de la modale de lightbox
    const lightBoxContainer = document.createElement( 'div' );
    lightBoxContainer.setAttribute( 'id', 'lightBox' );

    lightBoxContainer.innerHTML =
    `
    <div class="modal">
        <button id="lightBox-control-previous"></button>
        <!--   Put media   -->
        <button id="lightBox-control-next"></button>
    </div>
    `;
};

async function init() {
    const PHOTOGRAPHER_ID = getPhotographerID();

    // Récupère toutes les données issues de la fonction Fetch qui renvoie un objet
    const {
        photographer: PHOTOGRAPHER,
        mediasAssocied: ASSOCIED_MEDIAS,
    } = await getDataWithID(PHOTOGRAPHER_ID);

    displayData(PHOTOGRAPHER, ASSOCIED_MEDIAS);
};
init();