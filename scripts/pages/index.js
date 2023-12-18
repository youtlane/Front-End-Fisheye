/*
    permet de recuperer le contenu du fichier et le transformer en format json et retourner les datas
*/
async function getPhotographers() {
    const data = await fetch("data/photographers.json"); //Récupération de contenu du fichier photographers.json via requete http
    const dataJson = await data.json(); //transformation du resultat en format json
    return (dataJson); // retourn les donnees du fichier json
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

        // Ajouter un gestionnaire d'événements pour le clic sur la carte utilisateur
        userCardDOM.addEventListener("click", () => {
            // Afficher l'ID du photographe dans la console
            console.log('id ', id);

            // Rediriger vers la page du photographe en utilisant la fonction redirectToPhotographerPage
            redirectToPhotographerPage(id);
        });
    });
    
}






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



//pour la redirection (logo)
/*document.addEventListener("DOMContentLoaded", function() {
    // Sélectionnez l'élément image par son ID
    const logoImage = document.querySelector(".logo");

    // Ajoutez un écouteur d'événements pour le clic sur l'image
    logoImage.addEventListener("click", function() {
        // Redirigez vers la page d'accueil (à adapter en fonction de votre structure de projet)
        window.location.href = "index.html";
    });
});*/