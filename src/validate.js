const { getCode, getName} = require('country-list');
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';

export default function validate() {
    const email = document.querySelector("#email");
    const submitButton = document.querySelector("#submit");
    const report = document.querySelector(".report");

    const country = document.querySelector("#country");
    const postal = document.querySelector("#postal");

    const password = document.querySelector("#password");
    const confirm = document.querySelector("#confirm");

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

    let abbreviation;
    let passConfirm;

    email.addEventListener("input", (event) => {
        email.setCustomValidity("");
        if (!email.validity.valid) {
            email.reportValidity();
            return;
        }

        if (!email.value.endsWith("@gmail.com")) {
            email.setCustomValidity("Please enter an `@gmail.com` address");
        }

        if (email.validity.valid) {
            report.textContent = "";
        }
    })

    country.addEventListener("input", (event) => {
        country.setCustomValidity("");
        abbreviation = getCode(country.value);
        if (!country.validity.valid) {
            country.reportValidity();
            return;
        }
        if (postcodeValidatorExistsForCountry(abbreviation) === false) {
            country.setCustomValidity("Country not in registry!")
        }
        else {
            report.textContent = "";
        }

        // console.log(country.value);
        // console.log(abbreviation);
    })


    postal.addEventListener("input", (event) => {
        postal.setCustomValidity("");
        if (!postal.validity.valid) {
            postal.reportValidity();
            return;
        }

        if (postcodeValidatorExistsForCountry(`${abbreviation}`) !== true) {
            postal.setCustomValidity("Country is not in our registry");
            postal.reportValidity();
        }

        if (postcodeValidatorExistsForCountry(`${abbreviation}`) === true){
        if (postcodeValidator(postal.value, `${abbreviation}`) !== true) {
            postal.setCustomValidity(`Must be a valid ${abbreviation} postal code!`);
            postal.reportValidity();
        }
    }
        if (postcodeValidator(postal.value, `${abbreviation}`) === true) {
            report.textContent = "";
        }
    })

    password.addEventListener("input", (event) => {
        password.setCustomValidity("");
        if (!password.validity.valid) {
            password.reportValidity();
            return;
        }
        if (!passwordRegex.test(password.value)) {
            password.setCustomValidity("Password must contain at least ONE digit and ONE uppercase character");
        }
        if (passwordRegex.test(password.value)) {
            passConfirm = password.value;
            report.textContent = "";
        }
    })

    confirm.addEventListener("input", (event) => {
        confirm.setCustomValidity("");
        if (!confirm.validity.valid) {
            confirm.reportValidity();
            return;
        }
        if (confirm.value !== passConfirm) {
            confirm.setCustomValidity("Passwords do not match");
        }
        else {
            report.textContent = "";
        }
    })

    confirm.addEventListener    

    submitButton.addEventListener("click", () => {
        if (!confirm.validity.valid || confirm.value === "") {
            event.preventDefault();
            report.textContent = "Passwords do not match";
        }
        if(!password.validity.valid || password.value === "") {
            event.preventDefault();
            report.textContent = "Password must contain at least ONE digit and ONE uppercase character";
        }
        if(!postal.validity.valid || postal.value === "") {
            event.preventDefault();
            report.textContent = "Postal code does not match selected country!";
        }
        if(!country.validity.valid || postcodeValidatorExistsForCountry(`${abbreviation}`) !== true) {
            event.preventDefault();
            report.textContent = "Country not in registry!";
        }
        if(!email.validity.valid || email.value === "") {
            event.preventDefault();
            report.textContent = "Enter a valid email!";
        }
    })
}