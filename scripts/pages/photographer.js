import { GetData } from "../services/GetData.js";
import { Photographer } from "../models/Photographer.js";
import { HeaderPhotographer } from "../templates/HeaderPhotographer.js";
import { MediaFactory } from "../factories/MediaFactory.js";
import { MainPhotographer } from "../templates/MainPhotographer.js";
import { displayLightbox } from "../utils/lightbox.js"
import { submit, displayModal, closeModal } from '../utils/contactForm.js'

/*************************************************************************************************************/
const dataService = new GetData();
const idUrlPhotographer = parseInt(new URL(document.location).searchParams.get('id'));
let photographerData;
let mediaData;
let mainPhotographer = new MainPhotographer();

/*************************************************************************************************************/
async function displayPhotographerPage() {
    const { thePhotographer } = await init();
    const header = new HeaderPhotographer();
    header.headerPagePhotographer(thePhotographer);

    // trier par défaut par popularité et afficher la liste des medias
    sortAndDisplayMedias('Popularité');
    const filterMenu = document.querySelector(".modal_name");
    filterMenu.insertAdjacentHTML('afterbegin', thePhotographer.name);
}


function displayMedias(thePhotographer, mediasPhotographer) {
    mainPhotographer.thePhotographer = thePhotographer
    mainPhotographer.mediasPhotographer = mediasPhotographer;
    let index = mediasPhotographer.length + 5;
    mediasPhotographer
        .forEach(m => {
            index--;
            mainPhotographer.contentPagePhotographer(m, index);
            addLikeEventListeners(m); // ajouter les écouteurs d'événements après l'affichage
        });

    updateNbrLikes();
}


/*************************************************************************************************************/
function addLikeEventListeners(media) {
    const like = document.getElementById('like-' + media.id);
    like.addEventListener('click', (event) => handleLikeClick(event, media));
    const img = document.getElementById('media-' + media.id);
    img.addEventListener('click', () => handleImgClick(media));
}

/*************************************************************************************************************/
async function init() {
    const { photographers, media } = await dataService.getDataFromUrl();
    const mediasPhotographer = media
        .map(m => new MediaFactory(m)) //boucle sur l'objet media pour typer chaque element de tableau
        .filter(m => m.photographerId === idUrlPhotographer);
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
export function sortAndDisplayMedias(selectedOption) {
    let sortedMediasPhotographer;

    // Sélection de l'option de tri
    if (selectedOption === 'Popularité') {
        sortedMediasPhotographer = mediaData.slice().sort((a, b) => a.likes - b.likes);
    } else if (selectedOption === 'Date') {
        sortedMediasPhotographer = mediaData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selectedOption === 'Titre') {
        sortedMediasPhotographer = mediaData.slice().sort((a, b) => b.title.localeCompare(a.title));
    }

    mediaData = sortedMediasPhotographer;
    const section = document.querySelector(".main_content");

    // Clear existing content
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    displayMedias(photographerData, sortedMediasPhotographer);
}

/*
    Permet de dépiler le dropdown
*/
document.addEventListener('DOMContentLoaded', function () {
    const filterMenuButton = document.querySelector(".btn_list");
    filterMenuButton.addEventListener("click", () => {
        listFilterMenu(filterMenuButton);
    });
});

function listFilterMenu(filterMenuButton) {
    const filterMenu = document.querySelector(".dropdown_content");

    // Attribut du boutton filterMenuButton qui permet de voir si la liste est déjà dépilé
    const isExpanded = filterMenuButton.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
        filterMenu.style.display = "none";
    } else {
        filterMenu.style.display = "contents";
    }

    filterMenuButton.setAttribute("aria-expanded", !isExpanded);
    document.querySelector(".fa-chevron-down").classList.toggle("rotate");

    const newAriaHiddenValue = filterMenu.style.display === "none" ? "true" : "false";
    filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);
}

document.addEventListener('DOMContentLoaded', function () {
    const filterMenuButton = document.querySelector(".btn_list");
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
            sortAndDisplayMedias(filter.textContent);

            listFilterMenu(filterMenuButton);
        });
    });
});


/*************************************************************************************************************/
/**
 * modal contact
 */

document.addEventListener('DOMContentLoaded', function () {
    const btnForm = document.querySelector('#contact-form');
    const btnCloseModalForm = document.querySelector('#close-modal');
    const btnDisplayModalForm = document.querySelector('#display-modal');

    // Ouvrir le formulaire (bouton contact)
    btnDisplayModalForm
        .addEventListener('click', () => displayModal());

    // Fermer le formulaire (clic croix sur le modal)
    btnCloseModalForm
        .addEventListener('click', () => closeModal())

    // Fermer le formulaire (entrer croix sur le modal)
    btnCloseModalForm.addEventListener('keypress', e => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Soumission du formulaire
    btnForm.addEventListener('submit', e => {
        e.preventDefault()

        if (submit(e) === true) {
            console.log('Formulaire envoyé')
        } else {
            console.log('Erreur dans le formulaire')
        }
    });

});

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


function handleImgClick(media) {
    displayLightbox(media, mainPhotographer.thePhotographer, mediaData);
    updateNbrLikes();
}

/**
 * MAJ nombre like globale après clique sur boutton like d'un media
 */
function updateNbrLikes() {
    const nbrLikes = document.querySelector(".nbr-likes-content");
    // Clear existing content
    while (nbrLikes.firstChild) {
        nbrLikes.removeChild(nbrLikes.firstChild);
    }
    nbrLikes.insertAdjacentHTML('afterbegin', mainPhotographer.countLikesMedias());
}

displayPhotographerPage();
