import Todo from './Todo.js';
import {sb_utils as sb} from "../sb-utils/utils.js";

export default class TodoList {
    constructor({title, desc, data, icon = '' }){
        this.title = title;
        this.desc = desc;
        this.icon = icon;
        this.data = data;
        this.id = sb.generateID('todo');

        if(data && ! (data[0] instanceof Todo))
            this.data = this.data.map(
                d => new Todo(d)
            )
    }

    addItem(item){
        this.data.unshift(item);
    }
    getItemByID(id){
        return this.data.filter(
            item => item.id === id
        );
    }

    removeItem(id){
        this.data = this.data.filter(item => item.id !== id);
    }
}
