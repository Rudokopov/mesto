const userName = document.querySelector('.profile__user-name');
const userDescription = document.querySelector('.profile__user-description');
const editButton = document.querySelector('.profile__edit-button');
const userInput = document.getElementById('#popup__form-user');
const descriptionInput = document.getElementById('#popup__form-user-description');
const placeNameInput = document.getElementById('#popup__form-place-name')
const placeLinkInput = document.getElementById('#popup__form-place-link')
const formElementEdit = document.querySelector('.popup__form-edit');
const formElementAdd = document.querySelector('.popup__form-add')
const addButton = document.querySelector('.profile__add-button')
const cards = document.querySelector('.cards')
const card = document.querySelector('.card')
const popupImage = document.querySelector('.popup-image')
const likeButton = document.querySelector('.card__heart-button')
// все попы сайта
const popup = document.querySelector('.popup');
const editPop = document.querySelector('.popup-edit')
const placePop = document.querySelector('.popup-place')

// Удаление карточек
const removeCard = (card) => {
  card.remove()
}

const removeCardEvent = (evt) => {
  if (evt.target.classList.contains('card__trash-button')) {
    removeCard(evt.target.closest('.card'))
  }
}

document.addEventListener('click', removeCardEvent)
// Открытие popup
const openPop = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeButtonEvent)
}
// Закрытие popup
const closePop = (popup) => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeButtonEvent) 
}

const closeButtonEvent = (evt) => {
  if (evt.target.classList.contains('popup__form-close-button')) {
    closePop(evt.target.closest('.popup'))
  }
}
// Кнопки открытия popup
editButton.addEventListener('click', () => {
  userInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPop(editPop)
})

addButton.addEventListener('click', () => {
  openPop(placePop)
})
// Редактирование профиля
function formSubmitEdit (evt) {
  evt.preventDefault();
  userName.textContent = userInput.value
  userDescription.textContent = descriptionInput.value;
  closePop(editPop)
}

formElementEdit.addEventListener('submit', formSubmitEdit);
// Добавление новой карточки 
function formSubmitAdd (evt) {
  evt.preventDefault();
  initialCards.name = placeNameInput.value
  initialCards.link = placeLinkInput.value
  addCard(initialCards)
  closePop(placePop)

  placeNameInput.value = ''
  placeLinkInput.value = ''
}

formElementAdd.addEventListener('submit', formSubmitAdd);
// добавление карточек
const addCard = (initialCards) => {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card');
  const cardImage = document.createElement('img');
  cardImage.classList.add('card__image')
  cardImage.src = initialCards.link
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('card__trash-button')
  const cardBottom = document.createElement('div');
  cardBottom.classList.add('card__bottom')
  const cardTitle = document.createElement('h2')
  cardTitle.classList.add('card__description')
  cardTitle.textContent = initialCards.name
  const cardLike = document.createElement('button')
  cardLike.classList.add('card__heart-button')

  cardContainer.append(cardImage, deleteButton, cardBottom)
  cardBottom.append(cardTitle, cardLike)
  cards.prepend(cardContainer)
// Добавление лайка 

const cardLikeHandler = () => {
  document.querySelector('.card__heart-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__heart-button_active')
  })
}
cardLikeHandler()
// Открытие popup с картинкой
  const renderImageData = (image) => {
    document.querySelector('.popup-image__photo').src = initialCards.link
    document.querySelector('.popup-image__photo').alt = initialCards.alt
    document.querySelector('.popup-image__text').textContent = initialCards.name
  }
  const createCard = () => {
    const image = document.querySelector('.card__image');
    image.addEventListener('click', () => {
     openPop(popupImage);
     renderImageData(card);
     });
  }
  createCard()
}

initialCards.forEach((item) => {
  addCard(item)
})