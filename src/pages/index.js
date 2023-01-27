import './index.css';
import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { validationConfig } from '../data/cardsArray.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

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
  addPlaceSubmitButton,
  placeNameInput,
  placeLinkInput,
  userAvatar,
  popupClose,
  popupAcceptButton,
} from '../components/constants';
import { data } from 'autoprefixer';
import Popup from '../components/Popup';

const serverDate = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '0aba71cc-fce9-4c39-b3b0-8b4459f050db',
    'Content-Type': 'application/json',
  },
});

let userId = '';

const addFormValidation = new FormValidator(validationConfig, formElementAdd);
addFormValidation.enableValidation();

const editProfileFormaValidation = new FormValidator(
  validationConfig,
  formElementEdit
);
editProfileFormaValidation.enableValidation();

/*----------------------------Статичный функционал--------------------------------------*/

// Получаем свой userID
const getUserID = (userId) => {
  serverDate.getMyUserId().then((data) => {
    userId = data._id;
  });

  return userId;
};

getUserID();

// Устанавливаем данные для профиля
// const getMeUserInfo = () => {
//   serverDate.getProfileInfo().then((res) => userProfile.setUserInfo(res));
// };

const userProfile = new UserInfo({
  name: userName,
  description: userDescription,
  avatar: userAvatar,
});

const openProfile = () => {
  const data = userProfile.getUserInfo();
  edditPopup.setInputValues(data);
  editProfileFormaValidation.disableSubmitButton();

  edditPopup.open();
};

// Добавляет изменения в форму пользователя
const editProfileInformation = () => {
  const data = { author: userInput.value, info: descriptionInput.value };
  serverDate
    .changeProfileInfo(data)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      userProfile.setUserInfo(result);
    })
    .catch((err) => console.log(`Упс ${err}`));
};

const pushNewCard = () => {
  const data = { name: placeNameInput.value, link: placeLinkInput.value };
  serverDate
    .addNewCard(data)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      addNewCard(result);
    })
    .catch((err) => console.log(`Упс ${err}`));
};

const openPlace = () => {
  formElementAdd.reset();
  addFormValidation.disableSubmitButton();
  placeAddPopup.open();
};

buttonEdit.addEventListener('click', openProfile);
buttonAdd.addEventListener('click', openPlace);

const makeNewCard = (data) => {
  const card = new Card(data, userId, handleCardClick, deleteCardAccepted);
  const cardElement = card.generateCard(data);

  return cardElement;
};

const addNewCard = (data) => {
  newCard.addItem(makeNewCard(data));
};

const getMeAllCards = (mass) => {
  mass.forEach((item) => {
    newCard.addItem(makeNewCard(item));
  });
};

Promise.all([serverDate.getInitialCards(), serverDate.getProfileInfo()]).then(
  ([cards, userData]) => {
    userProfile.setUserInfo(userData);

    userId = userData._id;

    getMeAllCards(cards);
  }
);

const newCard = new Section(
  {
    renderer: (item) => {
      const card = makeNewCard(item);
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    },
  },
  cardContainer
);

/*---------------------Открытие попапа с картинкой-------------------------*/
const handleCardClick = (image, name) => {
  imagePopup.open(image, name);
};

const deleteCardAccepted = () => {
  closePopup.open();
};

const edditPopup = new PopupWithForm(popEdit, editProfileInformation);
const placeAddPopup = new PopupWithForm(placePop, pushNewCard);
const imagePopup = new PopupWithImage(popupImageContainer);
const closePopup = new Popup(popupClose);

edditPopup.setEventListeners();
placeAddPopup.setEventListeners();
imagePopup.setEventListeners();
userProfile.setUserInfo();
