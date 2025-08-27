import "./styles.css";

import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
const { getCode, getName} = require('country-list');
import selectCountry from "./selectCountry";
import validate from "./validate";

validate();
selectCountry();
