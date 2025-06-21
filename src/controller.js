import {SwipeHandler} from './components/SwipeHandler.js'


export  class Controller {
    constructor(app, view) {
        this.app = app;   // instance of ToDoApp (Model)
        this.view = view; // instance of View
        this.initEvents(this.swipeHandler);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindDoneTodo(this.handleDoneTodo);
    }

    handleDeleteTodo = (id) => {
        this.app.removeItem(id);
        this.view.removeTodoItem(id); // remove from DOM
    }
    handleDoneTodo = (id) => {
        this.app.toggleItemDone(id);
        this.view.toggleItemDone(id);
    }

    initEvents(){
        let items = this.view.getAllItems();
        items.forEach(item => {
            new SwipeHandler(item,
                () => {

                },
                () => {
                    let id = item.getAttribute('id');
                    this.app.removeItem(id);
                    item.remove();
                }
            );
        });
    }

}
