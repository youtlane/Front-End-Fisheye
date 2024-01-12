const modal = document.getElementById("contact_modal");

const displayModal = () => {
    modal.style.display = "block";
    modal.ariaHidden = 'false'

    // Set focus to the first interactive element within the lightbox
    const firstInteractiveElement = modal.querySelector('[tabindex="1"]');
    if (firstInteractiveElement) {
        firstInteractiveElement.focus();
    } 
}

const closeModal = () => {
    document.body.removeEventListener('focus', accessibilityFocus, true)
    modal.style.display = "none";
    modal.ariaHidden = 'true'
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

    document.querySelector('#contact_modal').style.display = 'none'
    return true
}

// Garder le focus dans le modal
const accessibilityFocus = (event) => {
    const modalNodes = modal.getElementsByTagName('*');
    const isInclude = Array.from(modalNodes).filter(e =>
      e.isEqualNode(event.target)
    );

    if (isInclude.length === 0) {
        document.querySelector('#first-name').focus();
    }
  }

export {
    displayModal,
    closeModal,
    submit
}
