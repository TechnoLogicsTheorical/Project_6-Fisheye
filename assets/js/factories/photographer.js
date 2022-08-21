function photographerFactory(data) {
    const {
        // Rénommer les propréties par le biais des alias
        id: idPhotographer,
        name: namePhotographer,
        tagline,
        
        // Réinstancer des variables de l'objet data
        picturePath = `assets/data/photographers/${data.portrait}`,
        completedAddress = `${data.city}, ${data.country}`,
        prestationPrice = `${data.price}€/jour`,
    } = data;


    function getPhotographerCardDOM() {
        const article = document.createElement( 'article' );
        
        const picturePhotographer = document.createElement( 'img' );
        picturePhotographer.setAttribute("src", picturePath)
        
        const titleNamed = document.createElement( 'h2' );
        titleNamed.textContent = namePhotographer;
        
        const sectionContent = document.createElement( 'div' );
        sectionContent.classList.add('content-card')
        sectionContent.innerHTML = 
        `<address>${completedAddress}</address>
         <p>${tagline}</p>
         <p>${prestationPrice}</p>
        `;
        
        article.appendChild(picturePhotographer);
        article.appendChild(titleNamed);
        article.appendChild(sectionContent);
        
        return (article);
    }
    return { namePhotographer, picturePath, getPhotographerCardDOM }
}