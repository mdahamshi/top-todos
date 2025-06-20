import Item from '../components/item.js';
import ItemList from '../components/ItemList.js';
import TodoApp from '../model.js'
import {tododata} from '../sample.js'
export default function() {
    
    const menuSection = document.createElement('div');

    let app = new TodoApp(tododata);
    const it = Item(app.getItemAll()[0]);
    console.table(app)
    const list = ItemList(app.getTodoList('projects'));

    app.getTodoLists().forEach(element => {
        let list = new ItemList(element);
        menuSection.append(list);
    });

    document.todoApp = app;
    


 
    return menuSection;
}
