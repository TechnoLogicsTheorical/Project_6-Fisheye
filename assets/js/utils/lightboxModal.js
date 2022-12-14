// Containers
const lightBoxContainer = document.querySelector( '#lightBox' );

// ------------------------------------------
//          ALL Functions LightBox
// ------------------------------------------
function changeStateOfLightbox() {
    lightBoxContainer.classList.toggle('open');
    if (lightBoxContainer.getAttribute('aria-hidden') === 'true') {
        lightBoxContainer.setAttribute('aria-hidden', 'false');
        mainSection.setAttribute('aria-hidden', 'true');

        const buttonNext = document.querySelector('#ctrl-next');
        buttonNext.focus();
    } else {
        lightBoxContainer.setAttribute('aria-hidden', 'true');
        mainSection.setAttribute('aria-hidden', 'false');
    }
}

function eraseAndPutMediaElement(mediaArticleElement) {
    const element = mediaArticleElement.cloneNode(true);
    const mediaElement = element.firstElementChild;
    const titleMediaElement = element.querySelector('h2');

    const mediaContainer = lightBoxContainer.querySelector('#lhtBoxMediaContainer');
    mediaContainer.innerHTML = '';
    mediaContainer.appendChild(mediaElement);
    mediaContainer.appendChild(titleMediaElement);
}

function previousMedia() {
    const medias = document.querySelectorAll('.photographer-media');
    const displayedElement = document.querySelector('#lhtBoxMediaContainer');
    const currentElement = displayedElement.firstChild.outerHTML;

    medias.forEach(function(mediaArticleElement, index) {
        const currentMediaInArray = mediaArticleElement.firstElementChild.outerHTML;

        if ( currentMediaInArray === currentElement ) {
            if (index === 0) {
                let lastIndex = medias.length - 1;

                const nextElement = medias[lastIndex];
                eraseAndPutMediaElement(nextElement);
            } else {
                const nextElement = medias[--index];
                eraseAndPutMediaElement(nextElement);
            }
        }
    });
}

function nextMedia() {
    const medias = document.querySelectorAll('.photographer-media');
    const displayedElement = document.querySelector('#lhtBoxMediaContainer');
    const currentElement = displayedElement.firstElementChild.outerHTML;

    medias.forEach(function(mediaArticleElement, index) {
        const currentMediaInArray = mediaArticleElement.firstElementChild.outerHTML;

        if ( currentMediaInArray === currentElement ) {
            if (index === (medias.length - 1)) {
                let nextElement = medias[0];
                eraseAndPutMediaElement(nextElement);
            } else {
                let nextElement = medias[index + 1];
                eraseAndPutMediaElement(nextElement);
                return 0;
            }
        }
    });
}

function initLightBox() {
    // All click Event
    const buttonClose = document.querySelector('#ctrl-close');
    buttonClose.addEventListener('click', changeStateOfLightbox);

    const buttonPrev = document.querySelector('#ctrl-prev');
    buttonPrev.addEventListener('click', previousMedia);

    const buttonNext = document.querySelector('#ctrl-next');
    buttonNext.addEventListener('click', nextMedia);

    // Recuperation des medias
    const medias = document.querySelectorAll('.photographer-media');
    medias.forEach(function (mediaArticleElement) {
        // On recupere juste l'??l??ment Image ou Vid??o
        const mediaElement = mediaArticleElement.firstElementChild;

        mediaElement.addEventListener('click', (event) => {
            eraseAndPutMediaElement(mediaArticleElement);
            changeStateOfLightbox();
        });

        mediaElement.addEventListener('keydown', (event) => {
            if (event.code === 'Enter') {
                event.preventDefault();
                event.stopImmediatePropagation();
                eraseAndPutMediaElement(mediaArticleElement);
                changeStateOfLightbox();
            }
        });
    })
}

// ------------------------------------------
//          LightBox Listeners
// ------------------------------------------

document.addEventListener('keydown', (event) => {
    if (lightBoxContainer.classList.value === 'open') {
        if (event.code === 'ArrowLeft') {
            previousMedia();
        } else if (event.code === 'ArrowRight') {
            nextMedia();
        } else if (event.code === 'Escape') {
            changeStateOfLightbox();
        }
    }
});