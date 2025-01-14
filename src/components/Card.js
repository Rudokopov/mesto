class Card {
  constructor({
    data,
    userId,
    handleCardClick,
    handleDeleteCard,
    deleteCardAccepted,
    handlePutLike,
    handleDeleteLike,
    cardTemplate,
  }) {
    this._cardTemplate = cardTemplate;
    this._element = cardTemplate.cloneNode(true);
    this._data = data;
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._avatar = data.avatar;

    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__heart-button');
    this._likeCount = this._element.querySelector('.card__heart-count');
    this._trushButton = this._element.querySelector('.card__trash-button');

    this._handleCardClick = handleCardClick;
    this._deleteCard = handleDeleteCard;
    this._checkAccepted = deleteCardAccepted;

    this._putLike = handlePutLike;
    this._deleteLike = handleDeleteLike;

    this._userId = userId;
    this._cardId = data._id;
  }

  /*------------------------------Устанавливаем слушатели------------------------------------*/

  _setEventListeners() {
    this._trushButton.addEventListener('click', () => {
      this._deleteCard(this._cardId);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._image, this._name);
    });
  }

  /*------------------------------Функции------------------------------------*/

  // Удаление карточек
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Лайк карточке
  _handleLike() {
    if (this._checkMassLikes()) {
      this._deleteLike(this._data)
        .then((res) => {
          this._data = res;
          this._checkLikes();
        })
        .catch((err) => console.log(err));
    }
    if (!this._checkMassLikes()) {
      this._putLike(this._data)
        .then((res) => {
          this._data = res;
          this._checkLikes();
        })
        .catch((err) => console.log(err));
    }
  }

  _checkLikes() {
    this._likeCount.textContent = this._data.likes.length;
    this._result = this._checkMassLikes();
    if (this._result) {
      this._cardLike();
    } else {
      this._cardDeleteLike();
    }
  }

  _cardLike() {
    this._likeButton.classList.add('card__heart-button_active');
  }

  _cardDeleteLike() {
    this._likeButton.classList.remove('card__heart-button_active');
  }

  _checkMassLikes() {
    return this._data.likes.some((id) => id._id === this._userId);
  }

  /*------------------------------Создаем карточку------------------------------------*/

  generateCard(data) {
    this._setEventListeners();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;

    if (this._userId !== data.owner._id) {
      this._trushButton.remove();
    }

    if (this._checkMassLikes()) {
      this._cardLike();
    }

    this._element.querySelector('.card__description').textContent = this._name;
    this._likeCount.textContent = data.likes.length;

    return this._element;
  }
}

export { Card };
