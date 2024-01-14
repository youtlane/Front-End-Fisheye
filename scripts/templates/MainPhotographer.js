import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

export class MainPhotographer {
    constructor(thePhotographer, mediasPhotographer) {
        this.thePhotographer = thePhotographer;
        this.mediasPhotographer = mediasPhotographer;
    }
    contentPagePhotographer(media, index) {
        const photographerName = this.thePhotographer.name.split(' ')[0].replace('-', ' ');
        const section = document.querySelector(".main_content");
        let mediaElement = '';
        if (media instanceof Image) {
            mediaElement = `<img class="photographer_work" id="media-${media.id}" src="./assets/work/${photographerName}/${media.image}" alt="${media.title}"> `;
        } else if (media instanceof Video) {
            mediaElement = `<video class="photographer_work" id="media-${media.id}" src="./assets/work/${photographerName}/${media.video}" title="${media.title}"></video>`;
        }
        const photographWork = `
            <article class="card" tabindex="${index}">
                    <a class="link_media">
                        ${mediaElement}
                        <div class="card-footer">
                            <h2 class="title_media">${media.title}</h2>
                            <aside class="card-aside" aria-label="Likes">
                                <span id="nbrLikes-${media.id}" class="nbrLikes">${media.likes}</span> 
                                <span id="like-${media.id}" class="fas fa-heart" aria-hidden="true"></span>
                            </aside>
                        </div>
                    </a>
            </article>
        `;
        section.insertAdjacentHTML('afterbegin', photographWork);
        return photographWork;
    }


    countLikesMedias() {
        let countNbrLikes = 0;
        this.mediasPhotographer.forEach(m => {
            countNbrLikes = countNbrLikes + m.likes;
        });
        return countNbrLikes;
    }
}