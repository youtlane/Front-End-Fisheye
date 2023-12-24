import { Media } from "./Media.js";

export class Image extends Media {
    constructor(media) {
        super(media);
        this.image = media.image;
    }
}