import { GetData } from "../services/GetData.js";
import { Photographer } from "../models/Photographer.js";
import { HeaderPhotographer } from "../templates/HeaderPhotographer.js";
import { MediaFactory } from "../factories/MediaFactory.js";
import { MainPhotographer } from "../templates/MainPhotographer.js";

/*************************************************************************************************************/
//Instanciation du service de recuperation des donnees
const dataService = new GetData();
// identifiant de photograph recuperee depuis l'url
const idUrlPhotographer = parseInt(new URL(document.location).searchParams.get('id'));
// Declare variables at the module level
let photographerData;
let mediaData;
let mainPhotographer = new MainPhotographer();

/*************************************************************************************************************/
async function displayPhotographerPage() {
    const { thePhotographer, mediasPhotographer } = await init();
    const header = new HeaderPhotographer();
    header.headerPagePhotographer(thePhotographer);
    displayMedias(thePhotographer, mediasPhotographer);

    //Initialisation du nom dans la modal du formulaire
    const filterMenu = document.querySelector(".modal_name");
    filterMenu.innerHTML = thePhotographer.name;
}

function displayMedias(thePhotographer, mediasPhotographer) {
    mainPhotographer.thePhotographer = thePhotographer
    mainPhotographer.mediasPhotographer = mediasPhotographer;
    mediasPhotographer
        .forEach(m => {
            mainPhotographer.contentPagePhotographer(m);
            addLikeEventListeners(m); // Ajoutez cette ligne pour ajouter les écouteurs d'événements après l'affichage
        });

    updateNbrLikes();
}


/*************************************************************************************************************/
function addLikeEventListeners(media) {
    // Sélectionnez tous les spans avec la classe 'fas fa-heart'
    const like = document.getElementById('like-' + media.id);
    like.addEventListener('click', (event) => handleLikeClick(event, media));
}

/*************************************************************************************************************/
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

/*************************************************************************************************************/

/*
    permer de trier les médias par option selectionné
*/
export function sortMedias(selectedOption) {
    let sortedMediasPhotographer;

    if (selectedOption === 'Popularité') {
        sortedMediasPhotographer = mediaData.slice().sort((a, b) => a.likes - b.likes);
    } else if (selectedOption === 'Date') {
        sortedMediasPhotographer = mediaData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selectedOption === 'Titre') {
        sortedMediasPhotographer = mediaData.slice().sort((a, b) => b.title.localeCompare(a.title));
    }
    const section = document.querySelector(".main_content");
    // Clear the content of the section
    section.innerHTML = '';
    displayMedias(photographerData, sortedMediasPhotographer);
}

/*
    Permet de dépiler le dropdown
*/
document.addEventListener('DOMContentLoaded', function () {
    const filterMenu = document.querySelector(".dropdown_content");
    const filterMenuButton = document.querySelector(".btn_list");
    const filterButtons = document.querySelectorAll(".dropdown_content button");

    // Ajout d'un listner click sur le filtre pour le tri
    filterMenuButton.addEventListener("click", () => {
        // Attribut du boutton filterMenuButton qui permet de voir si la liste est déjà dépilé
        const isExpanded = filterMenuButton.getAttribute("aria-expanded") === "true" || false;

        // Si premier click sur boutton depiler la liste ul; sinon cacher la liste
        if (isExpanded) {
            filterMenu.style.display = "none";
        } else {
            filterMenu.style.display = "contents";
        }

        filterMenuButton.setAttribute("aria-expanded", !isExpanded);
        document.querySelector(".fa-chevron-down").classList.toggle("rotate");

        const newAriaHiddenValue = filterMenu.style.display === "none" ? "true" : "false";
        filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

        const newTabIndexValue = filterMenu.style.display === "none" ? "-1" : "0";
        filterButtons.forEach(button => button.setAttribute("tabindex", newTabIndexValue));
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const currentFilter = document.querySelector('#current_filter');
    const allFilters = Array.from(document.querySelectorAll('.dropdown_content li button'));

    let filterAlreadySelected = allFilters.find(filter => filter.textContent == currentFilter.textContent);

    filterAlreadySelected.parentElement.style.display = 'none';

    allFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            currentFilter.textContent = filter.textContent;

            // Hide the entire <li> block
            const parentLi = filter.parentElement;
            parentLi.style.display = 'none';

            // If a filter was previously selected, show its <li> block
            if (filterAlreadySelected) {
                const previousParentLi = filterAlreadySelected.parentElement;
                previousParentLi.style.display = 'block';
            }

            filterAlreadySelected = filter;
            sortMedias(filter.textContent);
        });
    });
});




/*************************************************************************************************************/
/**
 * modal contact
 */

document.addEventListener('DOMContentLoaded', function () {
    const btnForm = document.querySelector('.contact_button');

    btnForm.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire

        // Récupère les données du formulaire
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Valide les données
        if (firstName.length < 2) {
            console.log("Le prénom doit avoir au moins 2 caractères.");
            return;
        }

        if (lastName.length < 2) {
            console.log("Le nom doit avoir au moins 2 caractères.");
            return;
        }

        // Utilise une expression régulière pour valider le format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("Veuillez saisir une adresse e-mail valide.");
            return;
        }

        if (message.length < 20 || message.length > 500) {
            console.log("Le message doit contenir entre 20 et 500 caractères.");
            return;
        }

        // Si toutes les validations passent, affiche les données dans la console
        console.log('Prénom:', firstName);
        console.log('Nom:', lastName);
        console.log('Email:', email);
        console.log('Message:', message);

        // Ajoutez ici le code pour envoyer les données au serveur si nécessaire
    });
});

/*************************************************************************************************************/
/**
 * the lightboox
 */






/*************************************************************************************************************/
function handleLikeClick(event, media) {
    const spanId = event.target.id;
    const mediaId = spanId.replace('like-', '');
    const likeContent = document.getElementById('nbrLikes-' + mediaId);
    const hasLikedAttribute = likeContent.getAttribute('data-has-liked');
    const hasLiked = hasLikedAttribute === 'true';

    // Verifie si déjà liké
    if (!hasLiked) {
        // Incremente par 1 si pas liké
        media.likes += 1;
        likeContent.setAttribute('data-has-liked', 'true');
    } else {
        // Decremente par 1 si déjà liké
        media.likes -= 1;
        likeContent.setAttribute('data-has-liked', 'false');
    }

    // modifie la valeur dans le DOM
    likeContent.textContent = media.likes;

    updateNbrLikes();
}

function updateNbrLikes() {
    const nbrLikes = document.querySelector(".nbr-likes-content");
    nbrLikes.innerHTML = mainPhotographer.countLikesMedias();
}

displayPhotographerPage();
