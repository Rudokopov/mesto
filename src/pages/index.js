/* Хочу заранее принести извиниться за то, что 2 раза на абум сдавал работу без сверки по чек листу и отнял ваше и свое время
обычно я так не поступаю :/
И хочу поблагодарить за развернутые и понятые требования по проектной работе!)
*/

import './index.css';
import { initialCards } from '../data/cardsArray.js';
import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Constants
import {
  userName,
  userDescription,
  buttonEdit,
  userInput,
  descriptionInput,
  formElementEdit,
  formElementAdd,
  buttonAdd,
  cardContainer,
  popEdit,
  placePop,
  popupImageContainer,
  validationConfig,
} from '../components/constants';

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

const openProfile = () => {
  const data = userProfile.getUserInfo();
  edditPopup.setInputValues(data);
  editProfileFormaValidation.disableSubmitButton();

  edditPopup.open();
};

const openPlace = () => {
  formElementAdd.reset();
  addFormValidation.disableSubmitButton();
  placeAddPopup.open();
};

buttonEdit.addEventListener('click', openProfile);

buttonAdd.addEventListener('click', openPlace);

const makeNewCard = (data) => {
  const card = new Card(data, handleCardClick);
  const cardElement = card.generateCard();
  newCard.addItem(cardElement);
  // return cardElement;
};

/*---------------------Открытие попапа с картинкой-------------------------*/
const handleCardClick = (image, name) => {
  imagePop.open(image, name);
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
const placeAddPopup = new PopupWithForm(placePop, makeNewCard);
const imagePopup = new PopupWithImage(popupImageContainer);
const imagePop = new PopupWithImage(popupImageContainer);

edditPopup.setEventListeners();
placeAddPopup.setEventListeners();
imagePopup.setEventListeners();
