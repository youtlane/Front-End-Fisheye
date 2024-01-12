import { Photographer } from "../models/Photographer.js";
import { GetData } from "../services/GetData.js";
import { PhotographerTemplate } from "../templates/homepage.js";

const dataService = new GetData();
const photographerService = new PhotographerTemplate();

/*
    permet de recuperer le contenu du fichier et le transformer en format json et retourner les datas
*/
async function getPhotographers() {
    const dataJson = dataService.getDataFromUrl();
    return dataJson;
}

/**
 * Permet de créer et d'ajouter les éléments Photographes à la home page
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer, tab) => {
        const tabNumer = tab + 1;
        const photograph = new Photographer(photographer);
        const photographerCardDOM = photographerService.getPhotographerTemplate(photograph, tabNumer);
        photographersSection.appendChild(photographerCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}


init();
