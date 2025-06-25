import "./form.css";
import { ElementBuilder, labelAndInput } from "../components/ElementBuilder.js";

export default function () {
  const form = new ElementBuilder("form")
    .setId("form-edit-todo")
    .addClass("todo-form", "flex-col")
    .setAttr("method", "post")
    .append(new ElementBuilder("h2").setText("Add List"));

  // Add label + input pairs
  [
    ...labelAndInput({
      labelText: "Title",
      inputType: "text",
      id: "todo-title",
      name: "todo-title",
      required: true,
    }),
  ].forEach((el) => form.append(el));

  // Add submit button
  form.append(
    new ElementBuilder("button")
      .addClass("sb-button")
      .setAttr("type", "submit")
      .setAttr("id", "button-edit-todo")
      .setText("Add List"),
  );

  return form.build();
}
