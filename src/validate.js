const { getCode, getName} = require('country-list');
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';

export default function validate() {
    const email = document.querySelector("#email");
    const submitButton = document.querySelector("#submit");
    const report = document.querySelector(".report");

    const country = document.querySelector("#country");
    const postal = document.querySelector("#postal");

    let abbreviation;


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

        console.log(country.value);
        console.log(abbreviation);
    })

    console.log(postcodeValidatorExistsForCountry("AO"));


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
        else {
            report.textContent = "";
        }
    })

    submitButton.addEventListener("click", () => {
        if(!email.validity.valid) {
            event.preventDefault();
            report.textContent = "Enter a valid email!";
        }
        if(!country.validity.valid || postcodeValidatorExistsForCountry(`${abbreviation}`) !== true) {
            event.preventDefault();
            report.textContent = "Country not in registry!";
        }
        if(!postal.validity.valid) {
            event.preventDefault();
            report.textContent = "Postal code does not match selected country!";
        }
    })
}