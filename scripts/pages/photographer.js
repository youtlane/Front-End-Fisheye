import { GetData } from "../services/GetData.js";
import { Photographer } from "../models/Photographer.js";
import { HeaderPhotographer } from "../templates/HeaderPhotographer.js";
import { MediaFactory } from "../factories/MediaFactory.js";
import { MainPhotographer } from "../templates/MainPhotographer.js";


//Instanciation du service de recuperation des donnees
const dataService = new GetData();

// identifiant de photograph recuperee depuis l'url
const idUrlPhotographer = parseInt(new URL(document.location).searchParams.get('id'));

// Declare variables at the module level
let photographerData;
let mediaData;


async function displayPhotographerPage() {
    const { thePhotographer, mediasPhotographer } = await init();
    const header = new HeaderPhotographer();
    header.headerPagePhotographer(thePhotographer);
    displayMedias(thePhotographer, mediasPhotographer);
}

function displayMedias(thePhotographer, mediasPhotographer) {
    const content = new MainPhotographer(thePhotographer, mediasPhotographer);
    mediasPhotographer
        .forEach(m => {
            content.contentPagePhotographer(m);
        });
}


async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await dataService.getDataFromUrl("/data/photographers.json");



    // Filter media items based on photographerId
    // Filtrer les médias en fonction de l'identifiant du photographe
    const mediasPhotographer = media
        .map(m => new MediaFactory(m)) //boucle sur l'objet media pour typer chaque element de tableau
        .filter(m => m.photographerId === idUrlPhotographer);
    // Trouver le photographe correspondant à l'identifiant spécifié
    const thePhotographer = photographers
        .map(p => new Photographer(p))
        .find(p => p.id === idUrlPhotographer);
    
    photographerData = thePhotographer;
    mediaData = mediasPhotographer;


    return { thePhotographer, mediasPhotographer };
}

export function sortMedias(selectedOption) {
    let sortedMediasPhotographer;

    if (selectedOption === 'popular') {
        sortedMediasPhotographer = mediaData.slice().sort((a, b) => a.likes - b.likes);
    } else if (selectedOption === 'byDate') {
        sortedMediasPhotographer = mediaData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selectedOption === 'byTitle') {
        sortedMediasPhotographer = mediaData.slice().sort((a, b) => b.title.localeCompare(a.title));
    }

    const section = document.querySelector(".main_content");
    // Clear the content of the section
    section.innerHTML = '';

    displayMedias(photographerData, sortedMediasPhotographer);
}

document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM to be fully loaded before attaching the event listener
    const sortSelect = document.getElementById('sortOption');

    sortSelect.addEventListener('change', function () {
        const selectedOption = sortSelect.value;
        sortMedias(selectedOption);
    });
});

displayPhotographerPage();
