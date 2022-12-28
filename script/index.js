const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submtit',
  inactiveButtonClass: 'popup__form-submtit_disable',
  inputErrorClass: 'popup__form-input-error',
};

import { Card } from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
// import { closePopup, openPopup } from './utils.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';

const userName = document.querySelector('.profile__user-name');
const userDescription = document.querySelector('.profile__user-description');
const buttonEdit = document.querySelector('.profile__edit-button');
const userInput = document.querySelector('#popup__form-user-name');
const descriptionInput = document.querySelector(
  '#popup__form-user-description'
);
const placeNameInput = document.querySelector('#popup__form-place-name');
const placeLinkInput = document.querySelector('#popup__form-place-link');
const formElementEdit = document.querySelector('.popup__form-edit');
const formElementAdd = document.querySelector('.popup__form-add');
const buttonAdd = document.querySelector('.profile__add-button');

const cardContainer = document.querySelector('.cards');

const popupList = document.querySelectorAll('.popup');
const popEdit = document.querySelector('.popup-edit');
const placePop = document.querySelector('.popup-place');

export const popupImageContainer = document.querySelector('.popup-image');

const addFormValidation = new FormValidator(validationConfig, formElementAdd);
addFormValidation.enableValidation();

const editProfileFormaValidation = new FormValidator(
  validationConfig,
  formElementEdit
);
editProfileFormaValidation.enableValidation();

/*----------------------------Статичный функционал--------------------------------------*/

// Кнопки открытия popup
buttonEdit.addEventListener('click', () => {
  userInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  const popup = new Popup(popEdit);
  popup.open();
});

buttonAdd.addEventListener('click', () => {
  formElementAdd.reset();
  addFormValidation.disableSubmitButton();
  const popup = new Popup(placePop);
  popup.open();
});
// Редактирование профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(popEdit);
}
formElementEdit.addEventListener('submit', handleFormEditSubmit);

const makeNewCard = () => {
  const card = new Card(initialCards);
  const cardElement = card.generateCard();
  return cardElement;
};

/*---------------------Открытие попапа с картинкой-------------------------*/
const imagePop = new PopupWithImage(popupImageContainer);
const handleCardClick = (image, name) => {
  imagePop.open(image, name);
};
/*---------------------Добавление карточки с формы-------------------------*/

function handleFormAddSubmit(evt) {
  evt.preventDefault();

  initialCards.name = placeNameInput.value;
  initialCards.image = placeLinkInput.value;

  const cardElement = makeNewCard(initialCards.name, initialCards.image);
  cardContainer.prepend(cardElement);
  closePopup(placePop);
}

formElementAdd.addEventListener('submit', handleFormAddSubmit);

const newCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, handleCardClick);
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    },
  },
  cardContainer
);

newCard.renderItems();
