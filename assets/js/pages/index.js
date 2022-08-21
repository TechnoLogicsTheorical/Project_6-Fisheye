    async function getPhotographers() {
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

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getPhotographerCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    