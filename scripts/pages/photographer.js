import { GetData } from "../services/GetData.js";
import { Photographer } from "../models/Photographer.js";
import { HeaderPhotographer } from "../templates/HeaderPhotographer.js";
import { MediaFactory } from "../factories/MediaFactory.js";

//Instanciation du service de recuperation des donnees
const dataService = new GetData();

// identifiant de photograph recuperee depuis l'url
const idUrlPhotographer = parseInt(new URL(document.location).searchParams.get('id'));

async function displayPhotographerPage(){
    const { thePhotographer, mediasPhotographer } = await init() ;
    console.log('1',thePhotographer);
    const header = new HeaderPhotographer();
    header.headerPagePhotographer(thePhotographer);

}



async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await dataService.getDataFromUrl("/data/photographers.json");

    console.log(media);
    console.log(photographers);

    // Filter media items based on photographerId
    // Filtrer les médias en fonction de l'identifiant du photographe
    const mediasPhotographer = media
        .map(m => new MediaFactory(m)) //boucle sur l'objet media pour typer chaque element de tableau
        .filter(m => m.photographerId === idUrlPhotographer);
    console.log('media ', mediasPhotographer);

    // Trouver le photographe correspondant à l'identifiant spécifié
    const thePhotographer = photographers
        .map(p => new Photographer(p))
        .find(p => p.id === idUrlPhotographer);
    console.log('photographers ', thePhotographer);
    return { thePhotographer, mediasPhotographer } ;
    
}

displayPhotographerPage();
//init();
