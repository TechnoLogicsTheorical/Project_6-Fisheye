/**
 * Permet d'afficher les données brutes récupérées au sein de la codeBase dans la Page demandée
 * @param {Array<object>} photographers Un tableau d'objet contenant tous les données brutes des photographes
 */
async function displayData(photographers) {
    // Element HTML conteneur de la page d'accueil et permet d'ajouter les éléments crées.
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = new Photographer(photographer);
        const userCardDOM = photographerModel.getCardDOM();
        photographersSection.innerHTML += userCardDOM;
    });
}

async function init() {
    // Récupère les datas des photographes et renvoyée en tant que paramètres de fonctions
    await displayData(await getAllPhotographers());
}

init();
