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
    // Récupérer l'élément HTML correspondant à la classe "photographer_section" (la section des photographes)
    const photographersSection = document.querySelector(".photographer_section");

    // Parcourir chaque photographe dans le tableau
    photographers.forEach((photographer) => {
        // Donner le type du photographe en instanciant un objet Photographer
        const photograph = new Photographer(photographer);
        // Call la function photographerTemplate pour create un model de photograph
        const photographerCardDOM = photographerService.getPhotographerTemplate(photograph);
        // Add element DOM de la carte user à la section des photographs
        photographersSection.appendChild(photographerCardDOM);
    });
}

async function init() {
    // récupérant uniquement la propriété "photographers" de l'objet.
    const { photographers } = await getPhotographers(); // extraire les valeurs de l'objet retourné par la fonction getPhotographers() 
    displayData(photographers);// Appeler la fonction displayData en lui passant la liste des photographes comme paramètre
}

// Call la function init pour start l'application
init();
