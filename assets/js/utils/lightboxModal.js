// Container
const lightBoxContainer = document.createElement( 'div' );
lightBoxContainer.setAttribute( 'id', 'lightBox' );
lightBoxContainer.setAttribute( 'class', 'closed' );

function closeLightBox() {
    lightBoxContainer.classList.add('closed');
    lightBoxContainer.classList.remove('open');
}

function openLightBox() {
    lightBoxContainer.classList.add('open');
    lightBoxContainer.classList.remove('closed');

    LightBoxGetAllMedias();
}


// ------------------------------------------
//          ALL Functions LightBox
// ------------------------------------------
function LightBoxGetAllMedias(event) {
    const medias = document.querySelectorAll('.photographer-media');
        console.log(event)
    medias.forEach(function (element) {
    })
}

function LightBoxInit() {

    const modalContainer = document.createElement( 'div' );
    modalContainer.setAttribute('class', 'modal');

    // Buttons de Controles
    const buttonCtrlPrevious = document.createElement( 'button' );
    buttonCtrlPrevious.setAttribute('id', 'ctrl-prev');
    buttonCtrlPrevious.setAttribute('class', 'button');

    const buttonCtrlNext = document.createElement( 'button' );
    buttonCtrlNext.setAttribute('id', 'ctrl-next');
    buttonCtrlNext.setAttribute('class', 'button');

    const buttonClose = document.createElement( 'button' );
    buttonClose.setAttribute('id', 'ctrl-close');
    buttonClose.setAttribute('class', 'button');

    // All click Event
    buttonClose.addEventListener('click', closeLightBox())

    // Image Container
    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('id', 'lhtBoxImageContainer');

    const imageElement = document.createElement('img');
    imageElement.src = 'https://picsum.photos/200/300';
    imageElement.alt = 'Await image';

    // Regroupement des différents élements
    modalContainer.appendChild(buttonCtrlPrevious);
    modalContainer.appendChild(buttonCtrlNext);
    modalContainer.appendChild(buttonClose);
    modalContainer.appendChild(imageContainer);

    imageContainer.appendChild(imageElement);
    lightBoxContainer.appendChild(modalContainer);

    return lightBoxContainer;
}
