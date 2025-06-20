export class ElementBuilder {
  constructor(type) {
    this.el = document.createElement(type);
  }

  addClass(...classes) {
    this.el.classList.add(...classes);
    return this;
  }

  setId(id) {
    this.el.id = id;
    return this;
  }

  setText(text) {
    this.el.textContent = text;
    return this;
  }

  setAttr(name, value) {
    this.el.setAttribute(name, value);
    return this;
  }

  on(event, handler) {
    this.el.addEventListener(event, handler);
    return this;
  }

  append(child) {
    this.el.appendChild(child instanceof ElementBuilder ? child.build() : child);
    return this;
  }

  build() {
    return this.el;
  }
}
