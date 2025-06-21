import './item.css'
import { format } from 'date-fns'

import {ElementBuilder} from './ElementBuilder.js'
export default function(item) {

    const li = new ElementBuilder('li')
        .setId(item.id)
        .addClass('todo-item', `priority-${item.priority}`)
        .build();

    const leftside = new ElementBuilder('div')
        .addClass('todo-item-left')
        .build();
    leftside.innerHTML = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>circle</title><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg></span>`;

    const itemData = new ElementBuilder('div')
    .addClass('todo-summary-data')
    .build();
    let date = format(new Date(item.due), "dd/MM/yyyy");
    itemData.append(
        new ElementBuilder('h3')
            .setText(item.title)
            .addClass('todo-title')
            .build(),
        new ElementBuilder('p')
            .setText(`Due: ${date}`)
            .addClass('todo-date')
            .build()
    );
    leftside.append(itemData)

    const rightSide = new ElementBuilder('button')
    .addClass('todo-item-expand','clickable' ,'expand-action', 'button-icon')
    .setAttr('action', item.id)
    .build();
    rightSide.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>open-in-new</title><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>`;


    const details = new ElementBuilder('div')
        .addClass('todo-item-details', 'collapsible', 'collapsed')
        .build(); 
    
    details.append(
        new ElementBuilder('p')
        .addClass('details-desc')
        .setText(item.desc)
        .build()
    );
    const toolbar = new ElementBuilder('div')
        .addClass('todo-item-toolbar')
        .build();
    
    const done = new ElementBuilder('button')
        .addClass( 'button-icon', 'clickable', 'done-todo')
        .setAttr('data-id', item.id)
        .build();
    done.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>`;


    const del = new ElementBuilder('button')
        .addClass( 'button-icon', 'clickable', 'delete-todo')
        .setAttr('data-id', item.id)
        .build();
    del.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" /></svg>`;



    const edit = new ElementBuilder('button')
        .addClass( 'button-icon', 'clickable', 'edit-todo')
        .setAttr('data-id', item.id)
        .build();
    edit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>file-edit-outline</title><path d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z" /></svg>`;

    toolbar.append(edit, del, done);

    details.append(toolbar);

    const summary = new ElementBuilder('div')
        .addClass('todo-item-summary')
        .build(); 
    

    summary.append(leftside, rightSide);



    li.append(summary, details);


    return li;
}
