import { sb_utils as sb } from "../sb-utils/utils.js";

export default class Todo {
  constructor({
    title,
    desc,
    due,
    done = false,
    priority,
    icon = "",
    list = "default",
  }) {
    this.title = title;
    this.desc = desc;
    this.due = due;
    this.done = done;
    this.priority = priority;
    this.list = list;
    this.icon = icon;
    this.id = sb.generateID("todo-item");
  }

  toggleState() {
    this.done = !this.done;
  }

  completed() {
    return this.done;
  }
}
