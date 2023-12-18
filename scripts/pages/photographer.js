//Mettre le code JavaScript lié à la page photographer.html


/*
    permet de recuperer le contenu du fichier et le transformer en format json et retourner les datas
*/
async function getPhotographers() {
    const data = await fetch("data/photographers.json"); //Récupération de contenu du fichier photographers.json via requete http
    const dataJson = await data.json(); //transformation du resultat en format json
    return (dataJson); // retourn les donnees du fichier json
}

    
function getPhotographerIdFromUrl() {
    const params = new URL(document.location).searchParams;
    return params.get('id');
}

async function init() {
    const photographerId = getPhotographerIdFromUrl();
    // Récupère les datas des photographes
    const { media, photographers } = await getPhotographers();

    // Filter media items based on photographerId
    const filteredMedia = media.filter(media => media.photographerId === parseInt(photographerId));
    const filteredphotographer = photographers.find(photographer => photographer.id === parseInt(photographerId));

    console.log('media ', filteredMedia);
    console.log('photographers ', filteredphotographer);

}



init();
