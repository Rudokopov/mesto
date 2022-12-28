import PopupWithImage from './PopupWithImage.js';

class Card {
  constructor(data, handleCardClick) {
    this._element = this._getTemplate();
    this._name = data.name;
    this._image = data.image;
    this._likeButton = this._element.querySelector('.card__heart-button');
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#card')
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  /*------------------------------Устанавливаем слушатели------------------------------------*/

  _setEventListeners() {
    this._element
      .querySelector('.card__trash-button')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });

    this._likeButton.addEventListener('click', () => {
      this._handleCardLike();
    });

    this._element
      .querySelector('.card__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._image, this._name);
      });
  }

  /*------------------------------Функции------------------------------------*/
  // Удаление карточек
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Лайк карточке
  _handleCardLike() {
    this._likeButton.classList.toggle('card__heart-button_active');
  }

  // _openPreviewCard() {
  //   popupImage.querySelector('.popup-image__photo').src = this._image;
  //   popupImage.querySelector('.popup-image__photo').alt = this._name;
  //   popupImage.querySelector('.popup-image__text').textContent = this._name;
  //   openPopup(popupImage);
  // }

  /*------------------------------Создаем карточку------------------------------------*/

  generateCard() {
    this._setEventListeners();
    this._cardImage = this._element.querySelector('.card__image');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__description').textContent = this._name;

    return this._element;
  }
}

export { Card };
