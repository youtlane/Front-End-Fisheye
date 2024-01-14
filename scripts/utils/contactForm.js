const modal = document.getElementById("contact_modal");

const displayModal = () => {
    modal.style.display = "block";
    modal.ariaHidden = 'false';

    // Set focus to the first interactive element within the lightbox
    const firstInteractiveElement = modal.querySelector('[tabindex="1"]');
    if (firstInteractiveElement) {
        firstInteractiveElement.focus();
    }
    document.addEventListener('keydown', handleKeyPress);
}

const closeModal = () => {
    
    modal.style.display = "none";
    modal.ariaHidden = 'true';
    document.removeEventListener('keydown', handleKeyPress);

}   


const submit = () => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Récupère les données du formulaire
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Valide les données
    if (firstName.length < 2) {
        console.log("Le prénom doit avoir au moins 2 caractères.");
        return false;
    }

    if (lastName.length < 2) {
        console.log("Le nom doit avoir au moins 2 caractères.");
        return false;
    }
    // Utilise une expression régulière pour valider le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log("Veuillez saisir une adresse e-mail valide.");
        return false;
    }
    if (message.length < 20 || message.length > 500) {
        console.log("Le message doit contenir entre 20 et 500 caractères.");
        return false;
    }
    // Si toutes les validations passent, affiche les données dans la console
    console.log('Prénom:', firstName);
    console.log('Nom:', lastName);
    console.log('Email:', email);
    console.log('Message:', message);

    document.querySelector('#contact_modal').style.display = 'none';
    document.removeEventListener('keydown', handleKeyPress);
    closeModal();
    return true;
}

const handleKeyPress = (event) => {
    const focusableElements = modal.querySelectorAll('[tabindex]');
    const focusedElement = document.activeElement;
    const currentIndex = Array.from(focusableElements).indexOf(focusedElement);

    if (event.key === 'Tab') {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
    } else if (event.key === 'Escape') {
        closeModal();
    }
}


export {
    displayModal,
    closeModal,
    submit
}
