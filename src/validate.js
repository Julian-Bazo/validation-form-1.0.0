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

        console.log(country.value);
        console.log(abbreviation);
    })

    postal.addEventListener("input", (event) => {
        postal.setCustomValidity("");
        if (!postal.validity.valid) {
            postal.reportValidity();
            return;
        }
        if (postcodeValidator(postal.value, `${abbreviation}`) === false) {
            postal.setCustomValidity(`Must be a valid ${abbreviation} postal code!`);
            postal.reportValidity();
        }
        console.log(postcodeValidator(postal.value, `${abbreviation}`))
    })

    submitButton.addEventListener("click", () => {
        if(!email.validity.valid) {
            event.preventDefault();
            report.textContent = "Enter a valid email!";
        }
    })
}