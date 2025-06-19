import "./styles.css";
import logoImage from "../asset/food.svg";


import {View} from './view.js';

new View();

const logo = document.querySelector('#nav-logo');
logo.src = logoImage;