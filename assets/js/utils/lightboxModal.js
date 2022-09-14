// Container
const lightBoxContainer = document.querySelector( '#lightBox' );

// ------------------------------------------
//          ALL Functions LightBox
// ------------------------------------------
function openLightBox() {
    lightBoxContainer.classList.toggle('open');
}

function eraseAndPutMediaElement(mediaArticleElement) {
    const element = mediaArticleElement.cloneNode(true);
    const mediaElement = element.firstElementChild;
    const titleMediaElement = element.querySelector('p');

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
    buttonClose.addEventListener('click', openLightBox);

    const buttonPrev = document.querySelector('#ctrl-prev');
    buttonPrev.addEventListener('click', previousMedia);

    const buttonNext = document.querySelector('#ctrl-next');
    buttonNext.addEventListener('click', nextMedia);

    // Recuperation des medias
    const medias = document.querySelectorAll('.photographer-media');
    medias.forEach(function (mediaArticleElement) {
        // On recupere juste l'élément Image ou Vidéo
        const mediaElement = mediaArticleElement.firstElementChild;

        mediaElement.addEventListener('click', (event) => {
            eraseAndPutMediaElement(mediaArticleElement);
            openLightBox();
        });
    })
}
