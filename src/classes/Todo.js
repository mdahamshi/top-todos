import {sb_utils as sb} from "../sb-utils/utils.js";


export default class Todo {
    constructor({title, desc, due, done, priority, icon = '' }){
        this.title = title;
        this.desc = desc;
        this.due = due;
        this.done = done;
        this.priority = priority;
        this.icon = icon;
        this.id = sb.generateID('todo');
    }

    toggleState(){
        this.done = ! this.done;
    }

    completed(){
        return this.done;
    }

}
