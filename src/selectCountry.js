const {getData} = require('country-list');

export default function selectCountry() {
    const select = document.querySelector("#country");

    const data = Array.from(getData());
    data.map((country) => {
        const countryName = document.createElement("option");
        countryName.textContent = country.name;
        select.appendChild(countryName);
    })
}