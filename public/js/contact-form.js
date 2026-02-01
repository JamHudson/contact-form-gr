
let contactForm = document.getElementById("contact-form");

contactForm.onsubmit = validate;

function getEmailFormat() {
    let emailFormat = null;

    let htmlFormat = document.getElementById("html-format").checked;
    let textFormat = document.getElementById("text-format").checked;
    if (htmlFormat) emailFormat = "html";
    else if (textFormat) emailFormat = "text";

    return emailFormat;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}

function validate() {
    let isValid = true;

    clearErrors();

    // First name is not blank
    let fname = document.getElementById("fname").value;
    if (!fname) {
        document.getElementById("fname-err").style.display = "block";
        isValid = false;
    }
    // Last name is not blank
    let lname = document.getElementById("lname").value;
    if (!lname) {
        document.getElementById("lname-err").style.display = "block";
        isValid = false;
    }
    // Email Address is not blank
    let email = document.getElementById("email").value;
    if (!email) {
        document.getElementById("email-err").style.display = "block";
        isValid = false;
    }
    // How did we meet is not blank
    let meetMethod = document.getElementById("meet-method").value;
    if (meetMethod === "none") {
        document.getElementById("method-err").style.display = "block";
        isValid = false;
    }
    // If meet is "other", then other is not blank
    else if (meetMethod == "other") {
        let other = document.getElementById("other").value;
        if (!other) {
            document.getElementById("other-err").style.display = "block";
            isValid = false;
        }
    }

    // Email format is not blank ONLY if "add me to your mailing list" is visible.
    let emailList = document.getElementById("mailingList").checked;
    if (emailList) {
        let emailFormat = getEmailFormat();
        if (emailFormat == null) {
            document.getElementById("format-err").style.display = "block";
            isValid = false;
        }
    }

    return isValid;
}