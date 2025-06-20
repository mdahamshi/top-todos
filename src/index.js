import "./styles.css";
import logoImage from "../asset/logo.svg";
import userImage from "../asset/woman.png";


import {View} from './view.js';

new View('SalmaToDo');

const logo = document.querySelector('#nav-logo');
logo.src = logoImage;

const user = document.querySelector('#user-img');
user.src = userImage;
