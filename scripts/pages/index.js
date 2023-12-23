
import GetData from "../services/GetData.js";
import { photographerTemplate } from "/scripts/templates/homepage.js";


const dataService = new GetData();

/*
    permet de recuperer le contenu du fichier et le transformer en format json et retourner les datas
*/
async function getPhotographers() {
    const datajason = dataService.getDataFromUrl("/data/photographers.json");
    return datajason;
    
}

/*
    Fonction asynchrone pour afficher les données des photographes sur la page.
    Prend un tableau d'objets "photographers" en paramètre.
*/
async function displayData(photographers) {
    // Récupérer l'élément HTML correspondant à la classe "photographer_section" (la section des photographes)
    const photographersSection = document.querySelector(".photographer_section");

    // Parcourir chaque photographe dans le tableau
    photographers.forEach((photographer) => {
        // Appeler la fonction photographerTemplate pour créer un modèle de photographe
        const photographerModel = photographerTemplate(photographer);

        // Extraire l'ID du modèle de photographe
        const { id } = photographerModel;

        // Obtenir l'élément DOM de la carte utilisateur à partir du modèle
        const userCardDOM = photographerModel.getUserCardDOM();

        // Ajouter l'élément DOM de la carte utilisateur à la section des photographes
        photographersSection.appendChild(userCardDOM);
    });
}


const logoImage = document.querySelector(".logo");
// Ajouter un gestionnaire d'événements au clic sur l'image
logoImage.addEventListener('click', function() {
    // Rediriger vers la page index.html
    window.location.href = 'index.html';
});
// Ajouter l'attribut alt à l'image
logoImage.setAttribute('alt', 'Fisheye Home page');
logoImage.setAttribute('aria-label' ,'fisheye home page' );


async function init() {
    // récupérant uniquement la propriété "photographers" de l'objet.
    const { photographers } = await getPhotographers(); // extraire les valeurs de l'objet retourné par la fonction getPhotographers() 
    displayData(photographers);// Appeler la fonction displayData en lui passant la liste des photographes comme paramètre

}

function redirectToPhotographerPage(photographerId) {
    window.location.href = "photographer.html?id=" + photographerId;
}

// Appeler la fonction d'initialisation pour démarrer l'application
init();
