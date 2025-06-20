import './itemlist.css'
import {ElementBuilder} from './ElementBuilder.js'
import Item from './item.js'
export default function(list) {

    const ul = new ElementBuilder('ul')
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
        .build();

    expand.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>triangle-down-outline</title><path d="M12 22L1 3H23M12 18L19.53 5H4.47" /></svg>`;
    head.append(expand);

    ul.append(head);

    list.data.forEach(item => {
        let element = new Item(item);
        ul.append(element);
    });

    return ul;
    
}
