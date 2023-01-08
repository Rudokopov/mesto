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
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const userName = document.querySelector('.profile__user-name');
const userDescription = document.querySelector('.profile__user-description');
const buttonEdit = document.querySelector('.profile__edit-button');
const userInput = document.querySelector('#user');
const descriptionInput = document.querySelector('#description');
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

const userProfile = new UserInfo({
  name: userName,
  description: userDescription,
});

// Кнопки открытия popup
// buttonEdit.addEventListener('click', () => {
//   userInput.value = userName.textContent;
//   descriptionInput.value = userDescription.textContent;
//   const popup = new Popup(popEdit);
//   popup.open();
// });

const openProfile = () => {
  const data = userProfile.getUserInfo();
  edditPopup.setInputValues(data);
  editProfileFormaValidation.disableSubmitButton();

  edditPopup.open();
};

buttonEdit.addEventListener('click', openProfile);

buttonAdd.addEventListener('click', () => {
  formElementAdd.reset();
  addFormValidation.disableSubmitButton();
  const popup = new PopupWithForm(placePop, addNewCard);
  popup.open();
});
// Редактирование профиля
// function handleFormEditSubmit(evt) {
//   evt.preventDefault();
//   userName.textContent = userInput.value;
//   userDescription.textContent = descriptionInput.value;
// closePopup(popEdit);
// }
// formElementEdit.addEventListener('submit', handleFormEditSubmit);

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

const addNewCard = (data) => {
  const card = new Card(data, handleCardClick);
  const cardElement = card.generateCard();
  newCard.addItem(cardElement);
};

const editProfileInformation = () => {
  const data = { author: userInput.value, info: descriptionInput.value };
  userProfile.setUserInfo(data);
};

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

const edditPopup = new PopupWithForm(popEdit, editProfileInformation);
edditPopup.setEventListeners();

const placeAddPopup = new PopupWithForm(placePop, addNewCard);
placeAddPopup.setEventListeners();

const imagePopup = new PopupWithImage(popupImageContainer);
imagePopup.setEventListeners();
