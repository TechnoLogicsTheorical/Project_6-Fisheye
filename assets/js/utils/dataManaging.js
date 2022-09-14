/**
 * Récupére les données brutes issue du fichier [photographers.json]
 * @return {Promise<object|Error>}
 */
async function getRawData() {
    try {
        const requestConfig = {
            myHeaders: new Headers(),

            myInit: {
                method: 'GET',
                headers: this.myHeaders,
                mode: 'cors',
                cache: 'default'
            },
        };
        let request = await fetch('assets/data/photographers.json', requestConfig.myInit);

        if (request.status === 404) {
            return new Error('Echec de la récuperation des données');
        }

        return await request.json()
    } catch (e) {
        console.info(e);
    }
}

/**
 * Récupére seulement les données de tous les photographes
 * @return {Promise<[object]>} Renvoie un tableau d'objet contenant tous les photographes
 */
async function getAllPhotographers() {
    const { 
        photographers 
    } = await getRawData();
    return photographers;
}

/**
 * Récupére et filtre les données pour un photographe donnée
 * @return {Promise<object>} Renvoie un objet consitutée d'un objet contenant les données du photographe, ainsi que d'un tableau d'objets contenant tous les médias qui lui sont associées
 */
async function getDataWithID(idPhotographer) {
    const {
        photographers,
        media: medias,
    } = await getRawData();
    
    const photographer = photographers.find( function (objectElementInArray) {
        if (objectElementInArray.id === idPhotographer) {
            return (objectElementInArray);
        }
    });

    const mediasAssocied = medias.filter( function (objectElementInArray) {
        if (objectElementInArray.photographerId === idPhotographer) {
            return (objectElementInArray);
        }
    });

    // Retourner un objet avec une proprieté Photographe, et les medias associées qui sont filtrées
    return {
        photographer,
        mediasAssocied,
    }
}