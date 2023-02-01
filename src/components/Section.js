export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = containerSelector;
    this._renderer = renderer;
  }

  // Сделал вспомогательную функцию для рендера карточки, потому что при методе prepend карточки попадают на сервер в конец списка
  // Но зато отрисовываются в начале, и никак не получилось скрестить в одной функции добавлении карточек на сервер и
  // Правильную отрисовку на странице (т.е в правильном порядке)
  // Поэтому эта функция отдельно добавляет карточки в разметку в удобном порядке (сначала новые потом старые)

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  addItemToMarkdown(item) {
    const card = this._renderer(item);
    this._container.append(card);
  }
}
