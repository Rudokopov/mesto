export default class Card {
  constructor(initialCards) {
    this._name = initialCards.name;
    this._image = initialCards.image;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#card")
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  /*------------------------------Устанавливаем слушатели------------------------------------*/

  _setEventListeners() {
    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".card__heart-button")
      .addEventListener("click", () => {
        this._handleCardLike();
      });

    // this._element
    //   .querySelector(".card__image")
    //   .addEventListener("click", () => {
    //     this._handlePreviewPicture();
    //   });
  }

  /*------------------------------Функции------------------------------------*/
  // Удаление карточек
  _handleDeleteCard() {
    this._element.closest(".card").remove();
  }

  // Лайк карточке
  _handleCardLike() {
    this._element
      .querySelector(".card__heart-button")
      .classList.toggle("card__heart-button_active");
  }

  // _handlePreviewPicture() {
  //   const popupImage = document.querySelector(".popup-image");
  //   popupImage.querySelector(".popup-image__photo").src = this._image;
  //   popupImage.querySelector(".popup-image__photo").alt = this._name;
  //   popupImage.querySelector(".popup-image__text").textContent = this._name;
  //   openPopup(popupImage);
  // }

  /*------------------------------Создаем карточку------------------------------------*/

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__description").textContent = this._name;

    return this._element;
  }
}
