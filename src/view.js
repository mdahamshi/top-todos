import  home from   './pages/home.js';
import menu from './pages/menu.js';
import about from './pages/about.js';
import {sb_utils as sb} from "./sb-utils/utils.js";


class View {

    constructor(appName){
        this.content = document.getElementById('content');
        this.navLinks = document.querySelector('.nav-links');
        this.initPages();
        this.content.innerHTML = '';
        this.content.appendChild(this.pages.home);
        this.addEvents();
        sb.addCopyRight(appName);
        document.querySelector('title').textContent = appName;
        document.getElementById('logo-name').textContent = appName;
        this.colorize();

    }
    colorize(){
        document.documentElement.style.setProperty(
        "--sb-theme-color",
        sb.getRandomColor(true)
        );
    }
    initPages(){
        this.pages.home = home();
        this.pages.menu = menu();
        this.pages.about = about();
    }
    pages = {};
    replaceContent(action){
        let newContent = this.pages[action];
        let c = this.content;
        c.replaceChild(newContent, c.firstChild);
    }
    actions = ['home', 'about'];
    addEvents(){
        const buttons = document.querySelectorAll('.flex-row button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                if(this.actions.includes(action)){
                    this.replaceContent(action)
                    this.navLinks.classList.remove('active');
                }
            });
        });

        const expand = document.querySelectorAll('button.expand-action');
        expand.forEach(button => {
            button.addEventListener('click', e => {
                e.preventDefault();
                let id = e.target.closest('button').getAttribute('action');
                let list_body = document.querySelector(`#${id} .collapsible`);
                list_body.classList.toggle('collapsed');
            })
        });

        document.querySelector('.menu-toggle').addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
        });

    }
}


export {View};