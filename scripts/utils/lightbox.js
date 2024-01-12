// Import des classes Image et Video depuis les fichiers correspondants
import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

// Sélection des éléments du DOM nécessaires
const lightboxWrapper = document.querySelector('.lightbox_wrapper');
const lightbox = document.querySelector('.lightbox');
const lightboxMedia = document.querySelector('.lightbox_media');
const btnClose = document.querySelector('.close-btn');
const btnPrevious = document.querySelector('.btn_prev');
const btnNext = document.querySelector('.btn_next');

// Initialisation des variables pour le suivi de l'état de la lightbox
let index = 0;
let mediaList = [];
let photographerName = '';

// Fonction pour afficher la lightbox avec un média spécifique
export function displayLightbox(media, thePhotographer, medias) {
    mediaList = medias;
    photographerName = thePhotographer.name.split(' ')[0].replace('-', ' ');
    lightboxWrapper.style.display = 'flex';
    index = medias.findIndex(m => m.id === media.id);
    
    displayMedia();

    // Set focus to the first interactive element within the lightbox
    const firstInteractiveElement = lightbox.querySelector('[tabindex="2"]');
    if (firstInteractiveElement) {
        firstInteractiveElement.focus();
    }
}

// Fonction pour afficher le média dans la lightbox
function displayMedia() {
    const media = mediaList[index];

    // Construction de la balise HTML du média en fonction de son type
    let mediaElement = '';
    if (media instanceof Image) {
        mediaElement = `<img class="photo_lightbox" tabindex="2" src="./assets/work/${photographerName}/${media.image}" alt="${media.title}"> `;
    } else if (media instanceof Video) {
        mediaElement = `<video controls tabindex="2" class="video_lightbox"><source src="./assets/work/${photographerName}/${media.video}" title="${media.title}"></video> `;
    }

    // Insertion du média dans la lightbox avec son titre
    // Clear existing content
    while (lightboxMedia.firstChild) {
        lightboxMedia.removeChild(lightboxMedia.firstChild);
    }
    lightboxMedia.insertAdjacentHTML('afterbegin', `
        ${mediaElement}
        <figcaption tabindex="3">${media.title}</figcaption>
    `);
}

// Fonction pour afficher le média suivant
function nextMedia() {
    if (index > 0) {
        index = index - 1;
        displayMedia();
    }
}

// Fonction pour afficher le média précédent
function previousMedia() {
    if (index < mediaList.length - 1) {
        index = index + 1;
        displayMedia();
    }
}

// Fonction pour fermer la lightbox
function closeLightbox() {
    lightboxWrapper.style.display = "none";
}

document.addEventListener('keyup', e => {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            previousMedia();
            break;
        case 'ArrowRight':
            nextMedia();
            break;
    }
});

// Ajout d'écouteurs d'événements aux boutons de navigation et de fermeture
btnPrevious.addEventListener('click', () => previousMedia());
btnNext.addEventListener('click', () => nextMedia());
btnClose.addEventListener('click', () => closeLightbox());
