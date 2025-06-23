import './itemlist.css';
import { ElementBuilder } from './ElementBuilder.js';
import Item from './item.js';

export default function createTodoList(list) {
    const listEl = new ElementBuilder('ul')
        .setId(list.id)
        .addClass('todo-list', 'sb-shadow')
        .build();

    const headerEl = new ElementBuilder('div')
        .addClass('todo-list-header', 'clickable')
        .build();

    const titleEl = new ElementBuilder('h2')
        .setText(list.title)
        .build();

    const toggleButtonEl = new ElementBuilder('button')
        .addClass('todo-list-expand', 'button-icon')
        .setAttr('action', list.id)
        .build();

    toggleButtonEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Expand</title>
            <path d="M12 22L1 3H23M12 18L19.53 5H4.47" />
        </svg>
    `;

    headerEl.append(titleEl, toggleButtonEl);

    const bodyEl = new ElementBuilder('div')
        .addClass('todo-list-body', 'collapsible')
        .build();

    list.data.forEach(itemData => {
        const itemEl = new Item(itemData);
        bodyEl.append(itemEl);
    });

    headerEl.addEventListener('click', e => {
        e.preventDefault();
        bodyEl.classList.toggle('collapsed');
        headerEl.classList.toggle('expanded'); // optional: for rotating the arrow
    });

    listEl.append(headerEl, bodyEl);
    return listEl;
}
