const ValidEmailPattern = /\w{1,}@{1}\w{1,}[.]{1}\w{1,}/d;

export function validateForm(data) {
    console.log("Server side validation happens here");
    console.log(data);

    const errors = [];

    if (!data.fname || data.fname.trim() == "") {
        errors.push("First name is required.");
    }
    if (!data.lname || data.fname.trim() == "") {
        errors.push("Last name is required.");
    }
    if (data.email) {
        if (!ValidEmailPattern.test(data.email)) {
            errors.push("Email is invalid.");
        }
    }
    if (data.linkedin) {
        if (!data.linkedin.startsWith("https://linkedin.com/in/")) {
            errors.push("LinkedIn is invalid.");
        }
    }

    if (data.method != "school" &&
        data.method != "techmeet" &&
        data.method != "other"
    ) {
        errors.push("Meet method is required.");
    } else if (data.method == "other") {
        if (!data.other || !data.other.trim() == "") {
            errors.push("Meet method is required.");
        }
    }

    if (data.mailinglist) {
        if (!data.emailformat || (data.emailformat != "text-format" && data.emailformat != "html-format"))
        {
            errors.push("Email format is invalid.");
        }
        if (!data.email) {
            errors.push("Email is required for mailing list.");
        }
    }


    console.log(errors);
    return {
        isValid: (errors.length === 0),
        errors
    };
}