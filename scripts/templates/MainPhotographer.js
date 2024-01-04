import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

export class MainPhotographer {
    constructor(thePhotographer, mediasPhotographer) {
        this.thePhotographer = thePhotographer;
        this.mediasPhotographer = mediasPhotographer;
    }

    contentPagePhotographer(media) {
        const photographerName = this.thePhotographer.name.split(' ')[0].replace('-', ' ');
        const section = document.querySelector(".main_content");
        let mediaElement = '';
        if (media instanceof Image) {
            mediaElement = `<img class="photographer_work" id="img-${media.id}" src="./assets/work/${photographerName}/${media.image}"> `;
        } else if (media instanceof Video) {
            mediaElement = `<video class="photographer_work" id="img-${media.id}" src="./assets/work/${photographerName}/${media.video}"></video> `;
        }

        const photographWork = `
            <article class="card">
                    <a class="link_media">
                        ${mediaElement}
                        <div class="card-footer">
                            <h2 class="title_media">${media.title}</h2>
                            <aside class="card-aside">
                                <span id="nbrLikes-${media.id}" class="nbrLikes">${media.likes}</span> 
                                <span id="like-${media.id}" class="fas fa-heart" aria-hidden="true"></span>
                            </aside>
                        </div>
                    </a>
            </article>
        `;
        section.insertAdjacentHTML('afterbegin', photographWork);
        //section.innerHTML = photographWork;
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