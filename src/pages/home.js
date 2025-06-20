import Item from '../components/item.js';
import ItemList from '../components/ItemList.js';
import TodoApp from '../model.js'
import {tododata} from '../sample.js'
export default function() {
    
    const todolists = document.createElement('div');
    todolists.classList.add('todo-list-group', 'flex-col');

    let app = new TodoApp(tododata);
    const it = Item(app.getItemAll()[0]);
    console.table(app)
    const list = ItemList(app.getTodoList('projects'));

    app.getTodoLists().forEach(element => {
        let list = new ItemList(element);
        todolists.append(list);
    });

    document.todoApp = app;
    


 
    return todolists;
}
