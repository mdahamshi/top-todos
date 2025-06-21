export  class Controller {
    constructor(app, view) {
        this.app = app;   // instance of ToDoApp (Model)
        this.view = view; // instance of View

        this.view.bindDeleteTodo(this.handleDeleteTodo);
    }

    handleDeleteTodo = (id) => {
        this.app.removeItem(id);
        this.view.removeTodoItem(id); // remove from DOM
    }

}
