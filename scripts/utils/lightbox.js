function displayLightbox(mediaId, type) {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "block";
    if (type === 'image') {
        mediaElement = `<img class=""  src="./assets/work/${photographerName}/${media.image}"> `;
    } else if (type === 'video') {
        mediaElement = `<video class=""  src="./assets/work/${photographerName}/${media.video}"></video> `;
    }

    const lighboxContent = document.querySelector(".lightbox-content");

    // const gallery = `

    //             ${mediaElement}

    // `;
    // lighboxContent.insertAdjacentHTML('afterbegin', gallery);
    // return gallery;
}

