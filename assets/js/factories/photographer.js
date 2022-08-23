function photographerFactory(data) {
    const {
        // Rénommer les propréties par le biais des alias
        id: idPhotographer,
        name: namePhotographer,
        tagline,
        
        // Réinstancer des variables de l'objet data
        picturePath = `assets/data/photographers/${data.portrait}`,
        completedLocation = `${data.city}, ${data.country}`,
        benefitPricePerDays = `${data.price}€/jour`,
        profileURI = 'photographer.html?id=' + idPhotographer,
    } = data;


    function getCardDOM() {
        const article = document.createElement( 'article' );
        // Ajouter le système de navigation entre la page d'accueil et la page photographer
        const linkCardProfile = document.createElement( 'a' );
        linkCardProfile.href = profileURI;
        
        const picturePhotographer = document.createElement( 'img' );
        picturePhotographer.setAttribute("src", picturePath)
        picturePhotographer.setAttribute("alt", 'Photographe: ' + namePhotographer)
        picturePhotographer.setAttribute('class', 'profile-image')
        
        const titleNamed = document.createElement( 'h2' );
        titleNamed.textContent = namePhotographer;
        
        linkCardProfile.appendChild(picturePhotographer);
        linkCardProfile.appendChild(titleNamed);
        
        const sectionContent = document.createElement( 'div' );
        sectionContent.classList.add('content-card')
        sectionContent.innerHTML = 
        `<address>${completedLocation}</address>
         <p>${tagline}</p>
         <p>${benefitPricePerDays}</p>
        `;
        
        article.appendChild(linkCardProfile);
        article.appendChild(sectionContent);
        
        return (article);
    }

    function getBannerDOM() {
        const bannerContainer = document.createElement( 'div' );
        bannerContainer.classList.add( 'photograph-header' );

        bannerContainer.innerHTML = `
            <div class="photographer_informations">
                <h1>${namePhotographer}</h1>
                <address>${completedLocation}</address>
                <p>${tagline}</p>
            </div>
            <button class="button" onClick="displayModal()">Contactez-moi</button>
            <img class="profile-image" src="${picturePath}" alt="Image du Photographe: ${namePhotographer}">
        `;

        return (bannerContainer);
    }

    return { namePhotographer, benefitPricePerDays , getCardDOM, getBannerDOM }
}