export class PhotographerTemplate {
    /*
        Récupérer la card 
    */
    getPhotographerTemplate(photographer, tabNumer) {
        const article = document.createElement('article');
        const photographerCard = `
                <a class="work_link" href="photographer.html?id=${photographer.id}" tabindex="${tabNumer}" aria-label="cliquer ici pour aller au profil de ${photographer.name}">
                    <img src="assets/photographers/${photographer.portrait}" alt="image de profile de ${photographer.name}">
                    <h2>${photographer.name}</h2>
                </a>
                <p class="localisation">${photographer.city}, ${photographer.country}</p>
                <p class="tag">${photographer.tagline}</p>
                <p class="price">${photographer.price}€/jour</p>`;

        article.insertAdjacentHTML('afterbegin', photographerCard);
        return article;
    }
}