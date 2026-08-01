//Select all necessary DOM elements (form, inputs, error message spans).
let registrationForm = document.getElementById("registrationForm");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let usernameError = document.getElementById("usernameError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let confirmPasswordError = document.getElementById("confirmPasswordError");

//Load saved username: On page load, check if a username is saved in localStorage. If so, pre-fill the username field.
window.addEventListener("load", function () {
    if (localStorage.getItem("username") !== null) {
        username.value = localStorage.getItem("username");
        email.value = localStorage.getItem("email");
        password.value = localStorage.getItem("password");
        confirmPassword.value = localStorage.getItem("confirmPassword");
    }
})

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    //Perform a final validation check on all fields.
    if (username.validity.valid
        && email.validity.valid
        && password.validity.valid
        && confirmPassword.value === password.value) {
        //Display a success message (e.g., an alert or update a status message on the page).
        alert("The form data is valid and has been submitted successfully!");
        //Save the username to localStorage using the saveFormData function.
        saveFormData();
        //Reset the form fields after successful submission.
        registrationForm.reset();
    } else {
        //If any field is invalid, ensure error messages are displayed and focus on the first invalid field.
        let isFocused = false;
        //Check each field's validity and display corresponding error messages. Focus on the first invalid field.
        if (!username.validity.valid) {
            usernameError.textContent = "Please enter a valid username.";
            username.focus();
            isFocused = true;
        } else {
            usernameError.textContent = "";
        }

        if (!email.validity.valid) {
            emailError.textContent = "Please enter a valid email address.";
            if (!isFocused) {
                email.focus();
                isFocused = true;
            }
        } else {
            emailError.textContent = "";
        }

        if (!password.validity.valid) {
            passwordError.textContent = "Password Invalid. Check password requirements.";
            if (!isFocused) {
                password.focus();
                isFocused = true;
            }
        } else {
            passwordError.textContent = "";
        }

        if (confirmPassword.value !== password.value || !confirmPassword.validity.valid) {
            confirmPasswordError.textContent = "Passwords do not match or is empty.";
            if (!isFocused) {
                confirmPassword.focus();
                isFocused = true;
            }
        } else {
            confirmPasswordError.textContent = "";
        }
    }
})

//function save the form data to the localStorage
function saveFormData() {
    //Use the "new FormData(registrationForm)" expression to create a new FormData object from the form, which allows me to easily access the form's input values in a structured way.
    let registrationFormData = new FormData(registrationForm);
    localStorage.setItem("username", registrationFormData.get("username"));
    localStorage.setItem("email", registrationFormData.get("email"));
    localStorage.setItem("password", registrationFormData.get("password"));
    localStorage.setItem("confirmPassword", registrationFormData.get("confirmPassword"));
}

//Real-time validation: Add input event listeners to each field
username.addEventListener("input", (event) => {
    if (username.checkValidity() === false) {
        usernameError.textContent = "Please enter a valid username.";
    } else {
        usernameError.textContent = "";
    }
});
email.addEventListener("input", (event) => {
    if (email.checkValidity() === false) {
        emailError.textContent = "Please enter a valid email address.";
    } else {
        emailError.textContent = "";
    }
});
password.addEventListener("input", (event) => {
    if (password.checkValidity() === false) {
        passwordError.textContent = "Password Invalid. Check password requirements.";
    } else {
        passwordError.textContent = "";
    }
});
confirmPassword.addEventListener("input", (event) => {
    if (event.target.value !== password.value) {
        confirmPasswordError.textContent = "Passwords do not match.";
    } else {
        confirmPasswordError.textContent = "";
    }
});