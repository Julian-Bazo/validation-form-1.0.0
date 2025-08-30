import "./styles.css";

import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
const { getCode, getName} = require('country-list');
import selectCountry from "./selectCountry";
import validate from "./validate";

validate();
selectCountry();

// TODO
// Finish password validation
// Create invalid and valid styles in CSS
// Apply proper spacing to form
// check out .onchange window event, to validate on window actions