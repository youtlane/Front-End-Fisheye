export class HeaderPhotographer {

    headerPagePhotographer(photographer) {
        const pageHeader = document.querySelector(".photograph-header");
        const priceContent = document.querySelector('#price-content');

        priceContent.insertAdjacentHTML('afterbegin', photographer.price);

        const personelInfos = `
            <div class="photographer-infos" tabindex="2">
                <h1 class="name name-xl">${photographer.name}</h1>
                <span class="localisation localisation-xl">${photographer.city}, ${photographer.country}</span>
                <p class="tag tag-xl">${photographer.tagline}</p>
            </div>
        `;
        pageHeader.insertAdjacentHTML('beforeend', `<img class="photographer-pic" tabindex="3" src="./assets/photographers/${photographer.portrait}" alt="${photographer.name}">`);
        pageHeader.insertAdjacentHTML('afterbegin', personelInfos);
        return personelInfos;
    }
}
