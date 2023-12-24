import { GetData } from "../services/GetData.js";

const dataService = new GetData();

function getPhotographerIdFromUrl() {
    const params = new URL(document.location).searchParams;
    return params.get('id');
}


async function init() {
    const photographerId = getPhotographerIdFromUrl();
    // Récupère les datas des photographes
    const { media, photographers } = dataService.getDataFromUrl("/data/photographers.json");

    console.log('media ', media);
    console.log('photographers ', photographers);

    // Filter media items based on photographerId
    // Filtrer les médias en fonction de l'identifiant du photographe
    const filteredMedia = media.filter(media => media.photographerId === parseInt(photographerId));

    // Trouver le photographe correspondant à l'identifiant spécifié
    const filteredPhotographer = photographers.find(photographer => photographer.id === parseInt(photographerId));


    console.log('media ', filteredMedia);
    console.log('photographers ', filteredPhotographer);

}


init();
