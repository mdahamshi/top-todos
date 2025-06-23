import TodoList from './classes/TodoList.js';
import Todo from './classes/Todo.js';

import {StorageManager} from './classes/StorageManager.js'

export  class ToDoApp {
    constructor(todoArr){

        this.storage = new StorageManager(this.appName);
        if(this.storage.exist())
            this.data = this.classifyData(this.storage.loadData());
        else if(todoArr && ! (todoArr[0] instanceof TodoList)){
            this.data = this.classifyData(todoArr);
            this.storage.saveData(this.data);
        }
    }
    appName = 'todoApp';
    classifyData(data){
        return data.map(
            list => new TodoList(list)
        );
    }

    getTodoLists(){
        return this.data;
    }
    getItemByID(id){
        return this.getItemAll().find(
            item => item.id === id
        );
    }
    updateItem(newItem){
        let item = this.getItemByID(newItem.id);
        this.getTodoList(item.list).updateItem(newItem);
        


        this.storage.saveData(this.data);
    }
    removeItem(id){
        this.data.forEach(list => {
            list.removeItem(id);
        });
        this.storage.saveData(this.data);
    }

    toggleItemDone(id){
        this.getItemByID(id)
        .toggleState();
    }
    getItemAll(){
        return this.data.reduce(
            (res, list) => res.concat(list.data), []
        );
    }
    getTodoList(title){
        return this.data.find(
            list => list.title.toLowerCase() === title.toLowerCase()
        );
    }

    addList({title, desc = '', data = [], icon = ''}){
        if(this.listExist(title))
            return;
        let list = new TodoList(title, desc, data, icon);
        this.data.unshift(list);
        this.storage.saveData(this.data);
    }
    addItem(listTitle, item){
        const list = this.getTodoList(listTitle);
        if (!list) return;
        
        const todo = item instanceof Todo ? itemData : new Todo(item);
        list.addItem(todo);
        this.storage.saveData(this.data);

    }
    listExist(listTitle){
        let list = this.getTodoList(listTitle);
        return list.length;
    }

    clearStorage(){
        this.storage.clear();
    }
}

