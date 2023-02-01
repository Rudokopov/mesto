export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._container = containerSelector;
    this._renderer = renderer;
  }

  addItem(card) {
    this._container.append(card);
  }

  addItemToMarkdown(card) {
    this._container.prepend(card);
  }

  renderItems(mass) {
    mass.forEach((item) => {
      this.addItemToMarkdown(this._renderer(item));
    });
  }
}
