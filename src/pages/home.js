import ItemList from "../components/ItemList.js";
export default function (lists) {
  const todolists = document.createElement("div");
  todolists.classList.add("todo-list-group", "flex-col");

  lists.forEach((element) => {
    let list = new ItemList(element);
    todolists.append(list);
  });

  return todolists;
}
