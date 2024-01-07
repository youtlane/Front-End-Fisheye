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
let selectedMedia = null;
let photographerName = '';

// Fonction pour afficher la lightbox avec un média spécifique
export function displayLightbox(media, thePhotographer, medias) {
    mediaList = medias;
    selectedMedia = media;
    // Extraction du prénom du photographe à partir de son nom complet, en supprimant les espaces et remplaçant les tirets par des espaces
    photographerName = thePhotographer.name.split(' ')[0].replace('-', ' ');

    lightboxWrapper.style.display = 'flex';
    index = medias.findIndex(m => m.id === media.id);

    // Appel de la fonction pour afficher le média
    displayMedia();
}

// Fonction pour afficher le média dans la lightbox
function displayMedia() {
    const media = mediaList[index];

    // Affichage du nom du photographe et type de média (Image ou Video)
    console.log('photographerName ', photographerName, media instanceof Image);

    // Construction de la balise HTML du média en fonction de son type
    let mediaElement = '';
    if (media instanceof Image) {
        mediaElement = `<img class="photo_lightbox" src="./assets/work/${photographerName}/${media.image}" alt="${media.title}"> `;
    } else if (media instanceof Video) {
        mediaElement = `<video controls class="video_lightbox"><source src="./assets/work/${photographerName}/${media.video}" title="${media.title}"></video> `;
    }

    // Insertion du média dans la lightbox avec son titre
    lightboxMedia.innerHTML = `
            ${mediaElement}
            <figcaption>${media.title}</figcaption>
        `;
}

// Fonction pour afficher le média suivant
function nextMedia() {
    // Vérification pour éviter de dépasser le début de la liste
    if (index > 0) {
        index = index - 1;
        // Appel de la fonction pour afficher le média
        displayMedia();
    }
}

// Fonction pour afficher le média précédent
function previousMedia() {
    // Vérification pour éviter de dépasser la fin de la liste
    if (index < mediaList.length - 1) {
        index = index + 1;
        // Appel de la fonction pour afficher le média
        displayMedia();
    }
}

// Fonction pour fermer la lightbox
function closeLightbox() {
    lightboxWrapper.style.display = "none";
}

// Ajout d'écouteurs d'événements aux boutons de navigation et de fermeture
btnPrevious.addEventListener('click', () => previousMedia());
btnNext.addEventListener('click', () => nextMedia());
btnClose.addEventListener('click', () => closeLightbox());
