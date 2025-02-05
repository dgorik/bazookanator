function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
}

function menuPopup() {
    const overlay = document.getElementById('leftColumn');
    overlay.classList.toggle('show');
}

function sendEmail() {
    let full_name = document.querySelector("#first_name") + " " + document.querySelector("#last_name")
    let email = document.querySelector("#email")
    let message = document.querySelector("#message")
    console.log(full_name, email, message)
}




