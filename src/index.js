import "./styles.css";
import logoImage from "../asset/logo.svg";
import userImage from "../asset/woman.png";


import {View} from './view.js';
import {ToDoApp} from './model.js';
import {Controller} from './controller.js';
import {tododata} from './sample.js'



const app = new ToDoApp(tododata);  // Model
const view = new View('SalmaToDo', app.getTodoLists()); // View
const controller = new Controller(app, view); // Connects both



const logo = document.querySelector('#nav-logo');
logo.src = logoImage;

const user = document.querySelector('#user-img');
user.src = userImage;
