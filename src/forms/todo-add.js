import "./form.css";
import { ElementBuilder, labelAndInput } from "../components/ElementBuilder.js";

export default function () {
  const form = new ElementBuilder("form")
    .setId("form-edit-todo")
    .addClass("todo-form", "flex-col")
    .setAttr("method", "post")
    .append(new ElementBuilder("h2").setText("Add Item"));

  // Add label + input pairs
  [
    ...labelAndInput({
      labelText: "Title",
      inputType: "text",
      id: "todo-title",
      name: "todo-title",
      required: true,
    }),
    ...labelAndInput({
      labelText: "Description",
      inputType: "text",
      id: "todo-desc",
      name: "todo-desc",
    }),
    ...labelAndInput({
      labelText: "Due",
      inputType: "date",
      id: "todo-due",
      name: "todo-due",
    }),
  ].forEach((el) => form.append(el));

  form.append(
    new ElementBuilder("label")
      .setAttr("for", "todo-priority")
      .setText("Priority"),
  );

  const select = new ElementBuilder("select")
    .setAttr("id", "todo-priority")
    .setAttr("name", "todo-priority");

  ["low", "medium", "high"].forEach((level) => {
    select.append(
      new ElementBuilder("option")
        .setAttr("value", level)
        .setText(level.charAt(0).toUpperCase() + level.slice(1)),
    );
  });

  form.append(select);
  const hiddenIdInput = new ElementBuilder("input")
    .setAttr("type", "hidden")
    .setAttr("id", "form-todo-id")
    .setAttr("name", "form-todo-id"); // optional, only needed if you're using FormData

  form.append(hiddenIdInput);
  // Add submit button
  form.append(
    new ElementBuilder("button")
      .addClass("sb-button")
      .setAttr("type", "submit")
      .setAttr("id", "button-edit-todo")
      .setText("Add Item"),
  );

  return form.build();
}
