export class PhotographerTemplate {
    getPhotographerTemplate(photographer) {
        const article = document.createElement('article');

        const photographerCard = `
                <a class="work_link" href="photographer.html?id=${photographer.id}" tabindex="0" role="link" aria-current="Profil de ${photographer.name}">
                    <img src="assets/photographers/${photographer.portrait}" alt="image de profile de ${photographer.name}">
                    <h2>${photographer.name}</h2>
                </a>
                <p class="localisation">${photographer.city}, ${photographer.country}</p>
                <p class="tag">${photographer.tagline}</p>
                <p class="price">${photographer.price}€/jour</p>`;

        article.innerHTML = photographerCard;

        return article;
    }
}