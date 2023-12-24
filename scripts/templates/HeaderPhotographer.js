export class HeaderPhotographer {

    headerPagePhotographer(photographer) {
        const pageHeader = document.querySelector(".photograph-header");
        console.log(photographer);
        const personelInfos = `
            <div class="photographer-infos">
                <h1 class="name">${photographer.name}</h1>
                <p class="localisation">${photographer.city}</p>
                <p class="tag">${photographer.tagline}</p>
            </div>
            
        `;
        pageHeader.insertAdjacentHTML('beforeend', `<img class="photographer-pic" src="/assets/photographers/${photographer.portrait}" alt="">`);
        pageHeader.insertAdjacentHTML('afterbegin', personelInfos);
        return personelInfos;
    }
}