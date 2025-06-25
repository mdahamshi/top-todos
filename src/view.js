import home from "./pages/home.js";
import todoEditForm from "./forms/todo-edit.js";
import todoAddForm from "./forms/todo-add.js";
import listAddForm from "./forms/list-add.js";
import about from "./pages/about.js";
import { createDialogModal } from "./components/DialogModal.js";
import { sb_utils as sb } from "./sb-utils/utils.js";
import { format } from "date-fns";
import Item from "./components/item.js";
import ItemList from "./components/ItemList.js";

class View {
  constructor(appName, lists) {
    this.content = document.getElementById("content");
    this.navLinks = document.querySelector(".nav-links");
    this.initPages(lists);
    this.content.innerHTML = "";
    this.content.appendChild(this.pages.home);
    this.addEvents();
    sb.addCopyRight(appName);
    document.querySelector("title").textContent = appName;
    document.getElementById("logo-name").textContent = appName;
    this.colorize();

    this.initDialog();
    this.initForms();
  }
  forms = {};
  formsNames = ["todo_edit", "todo_add"];

  pages = {};
  actions = ["home", "about"];

  colorize() {
    document.documentElement.style.setProperty(
      "--sb-theme-color",
      sb.getRandomColor(true),
    );
  }
  initDialog() {
    this.dialog = createDialogModal();
    document.body.insertBefore(this.dialog, this.content);
    this.dialog.content = document.getElementById("dialog-content");
    this.dialog.content.innerHTML = "";
  }
  initPages(lists) {
    this.pages.home = home(lists);
    this.pages.about = about();
  }
  initForms() {
    this.forms.todo_edit = todoEditForm();
    this.forms.todo_add = todoAddForm();
    this.forms.list_add = listAddForm();

    this.dialog.content.appendChild(this.forms.todo_edit);
    this.replaceForm("todo_add");
  }
  replaceForm(form) {
    let newForm = this.forms[form];
    let content = this.dialog.content;
    content.replaceChild(newForm, content.firstChild);
  }
  replaceContent(action) {
    let newContent = this.pages[action];
    let c = this.content;
    c.replaceChild(newContent, c.firstChild);
  }
  addEvents() {
    const buttons = document.querySelectorAll(".flex-row button");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;
        if (this.actions.includes(action)) {
          this.replaceContent(action);
          this.navLinks.classList.remove("active");
        }
      });
    });

    document.addEventListener("click", (e) => {
      const btn = e.target.closest('button[data-action="add-list"]');
      if (!btn) return;

      this.addListForm();
    });

    document.querySelector(".menu-toggle").addEventListener("click", () => {
      this.navLinks.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("button.btn-add-item");
      if (!btn) return;
      const id = btn.dataset.id;
      this.addTodoItemForm(id);
    });
  }
  bindDeleteTodo(handler) {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".delete-todo");
      if (!btn) return;

      const id = btn.getAttribute("data-id");
      handler(id);
    });
  }

  removeTodoItem(id) {
    const li = this.getItem(id);
    if (li) {
      li.classList.add("fade-out");
      setTimeout(() => li.remove(), 300);
    }
  }
  removeList(id) {
    this.getList(id).remove();
  }
  editTodoItem(item) {
    let formEl = this.forms.todo_edit;
    this.replaceForm("todo_edit");
    this.dialog.showModal();
    formEl.querySelector("#todo-title").value = item.title;
    formEl.querySelector("#todo-desc").value = item.desc;
    formEl.querySelector("#todo-priority").value = item.priority;
    formEl.querySelector("#todo-due").value = format(
      new Date(item.due),
      "yyyy-MM-dd",
    );
    formEl.querySelector("#form-todo-id").value = item.id;
  }
  addTodoItemForm(id) {
    let formEl = this.forms.todo_add;
    this.replaceForm("todo_add");
    this.dialog.showModal();
    console.log(id);
    formEl.querySelector("#form-todo-id").value = id;
  }
  addListForm() {
    let formEl = this.forms.list_add;
    this.replaceForm("list_add");
    this.dialog.showModal();
  }
  addList(newlist) {
    const listgroup = document.querySelector("#content > .todo-list-group");
    const list = new ItemList(newlist);
    listgroup.insertBefore(list, listgroup.firstChild);
  }
  getForms() {
    return this.forms;
  }
  bindDoneTodo(handler) {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".done-todo");
      if (!btn) return;

      const id = btn.getAttribute("data-id");

      handler(id);
    });
  }
  toggleItemDone(id) {
    const li = this.getItem(id);
    li?.classList.toggle("done");
    let todo_body = document.querySelector(`#${id} .collapsible`);
    todo_body.classList.add("collapsed");
  }
  updateItem(updatedItem) {
    const li = this.getItem(updatedItem.id);
    if (!li) return;

    li.querySelector(".todo-title").textContent = updatedItem.title;
    li.querySelector(".details-desc").textContent = updatedItem.desc;
    li.querySelector(".todo-date").textContent =
      "Due: " + format(new Date(updatedItem.due), "dd/MM/yyyy");
    li.classList.remove("priority-low", "priority-medium", "priority-high");
    li.classList.add(`priority-${updatedItem.priority}`);

    // Optional: Add a highlight effect to show it was updated
    li.classList.add("updated");
    setTimeout(() => li.classList.remove("updated"), 600);
  }

  addItem(listID, newItem) {
    let list = this.getList(listID);
    list.querySelector(".todo-list-body").prepend(new Item(newItem));
  }

  getAllItems() {
    return document.querySelectorAll("li.todo-item");
  }
  getAllLists() {
    return document.querySelectorAll("ul.todo-list");
  }
  getItem(id) {
    return document.querySelector(`li.todo-item[id="${id}"]`);
  }
  getList(id) {
    return document.querySelector(`ul.todo-list[id="${id}"]`);
  }
}

export { View };
