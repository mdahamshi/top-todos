import './itemlist.css'
import {ElementBuilder} from './ElementBuilder.js'
import Item from './item.js'
export default function(list) {

    const ul = new ElementBuilder('ul')
        .setId(list.id)
        .addClass('todo-list')
        .build();
    const head = new ElementBuilder('div')
        .addClass('todo-list-header')
        .build();
    head.append(
        new ElementBuilder('h2')
        .setText(list.title).build()
    )
    
    const expand = new ElementBuilder('button')
        .addClass('todo-list-expand', 'button-icon')
        .setAttr('action', list.id)
        .build();

    expand.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>triangle-down-outline</title><path d="M12 22L1 3H23M12 18L19.53 5H4.47" /></svg>`;
    head.append(expand);


    const body = new ElementBuilder('div')
        .addClass('todo-list-body', 'collapsed', 'collapsible')
        .build();

    list.data.forEach(item => {
        let element = new Item(item);
        body.append(element);
    });

    head.addEventListener('click', e => {
        e.preventDefault();
        body.classList.toggle('collapsed');
    });
    ul.append(head, body);

    return ul;
    
}
