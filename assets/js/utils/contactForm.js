function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    mainSection.setAttribute('aria-hidden', 'true');

    const firstInput = modal.querySelector('input:first-of-type');
    firstInput.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('role', 'dialog');
    mainSection.setAttribute('aria-hidden', 'false');
}

function createModalContact(namePhotographer) {
    // Création de la modale de contact
    const contactModal = document.createElement( 'div' );
    contactModal.setAttribute( 'id', 'contact_modal');
    contactModal.setAttribute('role', 'dialog');
    contactModal.setAttribute('aria-hidden', 'true');

    contactModal.innerHTML =
        `
        <div class="modal">
            <header>
                <h2>Contactez-moi<br>${namePhotographer}</h2>
                <img src="assets/images/static/icons/close.svg" onclick="closeModal()" alt="Fermer la modale de contact"/>
            </header>
        </div>
    `;

    const formInputsContainer = document.createElement( 'form' );
    formInputsContainer.innerHTML =
        `
    <div>
        <label for="firstName">Prénom</label>
        <input id="firstName" name="firstName" type="text" placeholder="John" autofocus required aria-required="true"/>
    </div>
    
    <div>
        <label for="lastName">Nom</label>
        <input id="lastName" name="lastName" type="text" placeholder="DOE" required aria-required="true"/>
    </div>
    
    <div>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" placeholder="john.doe@email.com" required aria-required="true"/>
    </div>
    
    <div>
        <label for="message">Email</label>
        <textarea id="message" name="message" required aria-required="true"></textarea>
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
}
