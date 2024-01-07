export class HeaderPhotographer {

    headerPagePhotographer(photographer) {
        const pageHeader = document.querySelector(".photograph-header");
        const priceContent = document.querySelector('#price-content');

        priceContent.innerHTML = photographer.price;

        const personelInfos = `
            <div class="photographer-infos">
                <h1 class="name name-xl">${photographer.name}</h1>
                <span class="localisation localisation-xl">${photographer.city}, ${photographer.country}</span>
                <p class="tag tag-xl">${photographer.tagline}</p>
            </div>
        `;
        pageHeader.insertAdjacentHTML('beforeend', `<img class="photographer-pic" src="/assets/photographers/${photographer.portrait}" alt="">`);
        pageHeader.insertAdjacentHTML('afterbegin', personelInfos);
        return personelInfos;
    }
}