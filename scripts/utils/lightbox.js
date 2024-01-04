import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

const lightboxWrapper = document.querySelector('.lightbox_wrapper');
const lightbox = document.querySelector('.lightbox');
const lightboxMedia = document.querySelector('.lightbox_media');
const btnClose = document.querySelector('.close-btn');
const btnPrevious = document.querySelector('.btn_prev');
const btnNext = document.querySelector('.btn_next');
var index = 0;
var mediaList = [];
var selectedMedia = null;
var photographerName = '';

export function displayLightbox(media, thePhotographer, medias) {
    mediaList = medias;
    selectedMedia = media;
    photographerName = thePhotographer.name.split(' ')[0].replace('-', ' ');
    lightboxWrapper.style.display = 'flex';
    index = medias.findIndex(m => m.id === media.id);

    displayMedia();
}

function displayMedia() {
    const media = mediaList[index];

    console.log('photographerName ', photographerName, media instanceof Image);


    let mediaElement = '';
    if (media instanceof Image) {
        mediaElement = `<img class="photo_lightbox" src="./assets/work/${photographerName}/${media.image}"> `;
    } else if (media instanceof Video) {
        mediaElement = `<video controls class="video_lightbox"><source src="./assets/work/${photographerName}/${media.video}" type="video/mp4"></video> `;
    }
    
    lightboxMedia.innerHTML = `
            ${mediaElement}
            <figcaption>${media.title}</figcaption>
        `;
}


function nextMedia() {
    if (index > 0) {
        index = index - 1;
        displayMedia();
    }
}

function previousMedia() {
    if (index < mediaList.length - 1) {
        index = index + 1;
        displayMedia();
    }
}

function closeLightbox() {
    lightboxWrapper.style.display = "none";
}


btnPrevious.addEventListener('click', () => previousMedia());
btnNext.addEventListener('click', () => nextMedia());
btnClose.addEventListener('click', () => closeLightbox());
