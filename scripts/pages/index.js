    /*
        permet de recuperer le contenu du fichier et le transformer en format json et retourner les datas
    */
    async function getPhotographers() {
        const data = await fetch("data/photographers.json"); //Récupération de contenu du fichier photographers.json via requete http
        const dataJson = await data.json(); //transformation du resultat en format json
        return (dataJson); // retourn les donnees du fichier json
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");//recuperer la div photographer_section

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
