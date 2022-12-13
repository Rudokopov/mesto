class Card {
  constructor(image, name) {
    this._name = name;
    this._image = image;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#card")
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    // Добавим данные
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__description").textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item.image, item.name);
  const cardElement = card.generateCard();

  // Добавляем в DOM
  const cardContainer = document.querySelector(".cards");
  cardContainer.prepend(cardElement);
});
