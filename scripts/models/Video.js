import { Media } from "./Media.js";

export class Video extends Media {
    constructor(media) {
        super(media);
        this.video = media.video;
    }
}