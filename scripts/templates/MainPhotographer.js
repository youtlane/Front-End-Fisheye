import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

export class MainPhotographer {
    constructor(thePhotographer, mediasPhotographer) {
        this.thePhotographer = thePhotographer;
        this.mediasPhotographer = mediasPhotographer;
    }

    contentPagePhotographer(media) {
        console.log("33", media, media instanceof Image, media instanceof Video); // Affiche "number"

        const section = document.querySelector(".main_content");
        let mediaElement = '';
        if (media instanceof Image) {
            mediaElement = `<img class="photographer_work" src="./assets/work/${this.thePhotographer.name}/${media.image}"> `;
        } else if (media instanceof Video) {
            mediaElement = `<video class="photographer_work" src="./assets/work/${this.thePhotographer.name}/${media.video}"></video> `;

        }

        const photographWork = `
        
            <article class="card">
                <div>
                    <a class="link_media" href="">
                        ${mediaElement}
                        <div class="card-footer">
                            <p class="title_media">${media.title}</p>
                            <span class="fas fa-heart" aria-hidden="true"></span>
                        </div>
                    </a>
                </div>
            </article>
        `;
        section.insertAdjacentHTML('afterbegin', photographWork);
        //section.innerHTML = photographWork;
        return photographWork;


    }

}