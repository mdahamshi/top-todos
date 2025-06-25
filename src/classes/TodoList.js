import Todo from "./Todo.js";
import { sb_utils as sb } from "../sb-utils/utils.js";

export default class TodoList {
  constructor({ title, desc, data, icon = "" }) {
    this.title = title;
    this.desc = desc;
    this.icon = icon;
    this.data = data;
    this.id = sb.generateID("todo-list");

    if (data && !(data[0] instanceof Todo))
      this.data = this.data.map((d) => {
        d.list = this.title;
        return new Todo(d);
      });
  }

  addItem(item) {
    item.list = this.title;
    this.data.unshift(item);
  }
  updateItem(newItem) {
    let item = this.getItemByID(newItem.id);
    item.title = newItem.title;
    item.desc = newItem.desc;
    item.due = newItem.due;
    item.priority = newItem.priority;
  }
  getItemByID(id) {
    return this.data.find((item) => item.id === id);
  }

  removeItem(id) {
    this.data = this.data.filter((item) => item.id !== id);
  }
}
