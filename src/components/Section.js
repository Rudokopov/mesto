export default class Section {
  constructor({ renderer }, container) {
    this._container = container;
    this._renderer = renderer;
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  addItemToMarkdown(item) {
    const card = this._renderer(item);
    this._container.append(card);
  }

  renderItems(mass) {
    mass.forEach((item) => {
      this.addItemToMarkdown(item);
    });
  }
}
