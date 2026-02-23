const ValidEmailPattern = /\w{1,}@{1}\w{1,}[.]{1}\w{1,}/d;

let meetMethodElement = document.getElementById("meet-method");
let otherBoxElement = document.getElementById("other");
let mailingListElement = document.getElementById("mailing-list");
let emailFormatSectionElement = document.getElementById("email-format-section");

let contactForm = document.getElementById("contact-form");


// Reveals the "other" text box if necessary on method change.
meetMethodElement.oninput = onMethodChanged;
function onMethodChanged() {
    let method = meetMethodElement.value;
    if (method == "other") {
        otherBoxElement.parentElement.style.display = "";
    } else {
        otherBoxElement.parentElement.style.display = "none";
    }
}


// Reveals the email format if mailing is checked.
mailingListElement.oninput = onMailingListChanged;
function onMailingListChanged() {
    let mailingChecked = mailingListElement.checked;
    if (mailingChecked) {
        emailFormatSectionElement.style.display = "";
    } else {
        emailFormatSectionElement.style.display = "none";
    }
}

// Returns the selected email format.
function getEmailFormat() {
    let emailFormat = null;

    let htmlFormat = document.getElementById("html-format").checked;
    let textFormat = document.getElementById("text-format").checked;
    if (htmlFormat) emailFormat = "html";
    else if (textFormat) emailFormat = "text";

    return emailFormat;
}

// Hides all errors.
function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}

// Form validation
contactForm.onsubmit = validate;
function validate() {
    let isValid = true;

    // Clears existing errors.
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
    if (email) {
        if (!ValidEmailPattern.test(email)) {
            document.getElementById("email-err").style.display = "block";
            isValid = false;
        }
    }
    // LinkedIn is specified if not blank
    let linkedIn = document.getElementById("linkedin").value;
    if (linkedIn) {
        if (!linkedIn.startsWith("https://linkedin.com/in/")) {
            document.getElementById("linkedin-err").style.display = "block";
            isValid = false;
        }
    }

    // How we met is not blank
    let meetMethod = meetMethodElement.value;
    if (meetMethod === "none") {
        document.getElementById("method-err").style.display = "block";
        isValid = false;
    }
    // If method is "other", then other is not blank
    else if (meetMethod == "other") {
        let other = document.getElementById("other").value;
        if (!other) {
            document.getElementById("other-err").style.display = "block";
            isValid = false;
        }
    }

    // Email format is not blank ONLY if "add me to your mailing list" is visible.
    let emailList = document.getElementById("mailing-list").checked;
    if (emailList) {
        let emailFormat = getEmailFormat();
        if (emailFormat == null) {
            document.getElementById("format-err").style.display = "block";
            isValid = false;
        }
        if (!email) {
            document.getElementById("email-err").style.display = "block";
            isValid = false;
        }
    }

    return isValid;
}

// Initial call for hiding elements.
onMethodChanged();
onMailingListChanged();
clearErrors();