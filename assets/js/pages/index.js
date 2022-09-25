async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = new Photographer(photographer);
        const userCardDOM = photographerModel.getCardDOM();
        photographersSection.innerHTML += userCardDOM;
    });
};

async function init() {
    // Récupère les datas des photographes et renvoyée en tant que paramètres de fonctions
    displayData(await getAllPhotographers());
};

init();
