import { SwipeHandler } from "./components/SwipeHandler.js";

export class Controller {
  constructor(app, view) {
    this.app = app; // instance of ToDoApp (Model)
    this.view = view; // instance of View
    this.initEvents(this.swipeHandler);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindDoneTodo(this.handleDoneTodo);
  }

  handleDeleteTodo = (id) => {
    this.app.removeItem(id);
    this.view.removeTodoItem(id); // remove from DOM
  };
  handleDoneTodo = (id) => {
    this.app.toggleItemDone(id);
    this.view.toggleItemDone(id);
  };
  foromInit() {
    const forms = this.view.getForms();
    const formedit = forms.todo_edit;
    formedit.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = formedit;
      const updatedTodo = {
        id: form.querySelector("#form-todo-id").value,
        title: form.querySelector("#todo-title").value.trim(),
        desc: form.querySelector("#todo-desc").value.trim(),
        due: form.querySelector("#todo-due").value,
        priority: form.querySelector("#todo-priority").value,
      };

      this.app.updateItem(updatedTodo);
      this.view.updateItem(updatedTodo);
      this.view.dialog.close();
    });

    const formadd = forms.todo_add;

    formadd.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = formadd;
      const newItem = {
        listid: form.querySelector("#form-todo-id").value,
        title: form.querySelector("#todo-title").value.trim(),
        desc: form.querySelector("#todo-desc").value.trim(),
        due: form.querySelector("#todo-due").value,
        priority: form.querySelector("#todo-priority").value,
      };

      const item = this.app.addItemByListID(newItem.listid, newItem);
      this.view.addItem(newItem.listid, item);
      this.view.dialog.close();
    });

    const formlist = forms.list_add;

    formlist.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = formlist;
      const title = form.querySelector("#todo-title").value.trim();
      const list = this.app.addList({ title });

      this.view.addList(list);
      this.view.dialog.close();
    });
  }
  initEvents() {
    this.foromInit();
    let items = this.view.getAllItems();
    items.forEach((item) => {
      const editbtn = item.querySelector("button.edit-todo");
      editbtn.addEventListener("click", (e) => {
        let id = item.getAttribute("id");

        this.view.editTodoItem(this.app.getItemByID(id));
      });

      new SwipeHandler(item, {
        onSwipeLeft: () => {
          let id = item.getAttribute("id");
          this.handleDoneTodo(id);
        },
        onSwipeRight: () => {
          let id = item.getAttribute("id");
          this.handleDeleteTodo(id);
        },
      });
    });

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("button.btn-del-list");
      if (!btn) return;
      const id = btn.dataset.id;
      this.app.removeList(id);
      this.view.removeList(id);
    });
  }
}
