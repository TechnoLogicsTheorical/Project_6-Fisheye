async function getRawDatas() {
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
        let request = await fetch('/assets/data/photographers.json', requestConfig.myInit);

        if (request.status === 404) {
            throw new Error('Echec de la récuperation des données');
        }

        return request.json()
    } catch (e) {
        console.info(e);
    }
}

async function getAllPhotographers() {
    const { 
        photographers 
    } = await getRawDatas();
    return photographers;
}

async function getDatasWithID(idPhotographer) {
    const {
        photographers,
        media: medias,
    } = await getRawDatas();
    
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