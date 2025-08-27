import "./styles.css";

import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
const { getCode, getName} = require('country-list');
import selectCountry from "./selectCountry";

selectCountry();

console.log(getCode("Taiwan (Province of China)"));