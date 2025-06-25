import TodoList from "./classes/TodoList.js";
import Todo from "./classes/Todo.js";

import { StorageManager } from "./classes/StorageManager.js";

export class ToDoApp {
  constructor(todoArr) {
    this.storage = new StorageManager(this.appName);
    if (this.storage.exist())
      this.data = this.classifyData(this.storage.loadData());
    else if (todoArr && !(todoArr[0] instanceof TodoList)) {
      this.data = this.classifyData(todoArr);
      this.storage.saveData(this.data);
    }
  }
  appName = "todoApp";
  classifyData(data) {
    return data.map((list) => new TodoList(list));
  }

  getTodoLists() {
    return this.data;
  }
  getItemByID(id) {
    return this.getItemAll().find((item) => item.id === id);
  }
  updateItem(newItem) {
    let item = this.getItemByID(newItem.id);
    this.getTodoList(item.list).updateItem(newItem);

    this.storage.saveData(this.data);
  }
  removeItem(id) {
    this.data.forEach((list) => {
      list.removeItem(id);
    });
    this.storage.saveData(this.data);
  }
  removeList(id) {
    this.data = this.data.filter((list) => list.id !== id);
    this.storage.saveData(this.data);
  }
  toggleItemDone(id) {
    this.getItemByID(id).toggleState();
  }
  getItemAll() {
    return this.data.reduce((res, list) => res.concat(list.data), []);
  }
  getTodoList(title) {
    return this.data.find((list) => {
      return list.title.toLowerCase() === title.toLowerCase();
    });
  }
  getTodoListByID(id) {
    return this.getTodoLists().find((list) => list.id === id);
  }
  addList({ title, desc = "", data = [], icon = "" }) {
    console.log(title);
    if (this.listExist(title)) return this.getTodoList(title);
    let list = new TodoList({ title, desc, data, icon });
    this.data.unshift(list);
    this.storage.saveData(this.data);
    return list;
  }
  addItem(listTitle, item) {
    const list = this.getTodoList(listTitle);
    if (!list) return;

    const todo = item instanceof Todo ? itemData : new Todo(item);
    list.addItem(todo);
    this.storage.saveData(this.data);
    return todo;
  }
  addItemByListID(listid, item) {
    const todo = item instanceof Todo ? itemData : new Todo(item);

    this.getTodoListByID(listid).addItem(todo);
    this.storage.saveData(this.data);
    return todo;
  }
  listExist(listTitle) {
    let list = this.getTodoList(listTitle);
    return list ? true : false;
  }

  clearStorage() {
    this.storage.clear();
  }
}
