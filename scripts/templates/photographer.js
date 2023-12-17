function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("id", id);
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", tagline);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        const localisation = document.createElement('p');
        localisation.textContent = city + ", " + country;
        localisation.classList.add('localisation');

        const tag = document.createElement('p');
        tag.textContent = tagline;
        tag.classList.add('tag');

        const pricePhoto = document.createElement('p');
        pricePhoto.textContent = price + "/jour";
        pricePhoto.classList.add('price');

        article.appendChild(localisation);
        article.appendChild(tag);
        article.appendChild(pricePhoto);


        return (article);
    }
    return { name, picture, id, getUserCardDOM }
}