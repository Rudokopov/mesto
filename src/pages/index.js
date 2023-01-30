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
  formElementAvatar,
  avatarLinkInput,
  avatarPop,
  avatarButton,
} from '../utils/constants';
import { data } from 'autoprefixer';
import Popup from '../components/Popup.js';

import SubmitPopup from '../components/SubmitPopup.js';

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

const avatarFormaValidate = new FormValidator(
  validationConfig,
  formElementAvatar
);

avatarFormaValidate.enableValidation();

/*----------------------------Статичный функционал--------------------------------------*/

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
  const data = {
    author: userInput.value,
    info: descriptionInput.value,
  };
  edditPopup.loading(true);
  serverDate
    .changeProfileInfo(data)
    .then((result) => {
      userProfile.setUserInfo(result);
    })
    .catch((err) => console.log(err))
    .finally(() => edditPopup.loading(false));
};

const pushNewCard = () => {
  const data = { name: placeNameInput.value, link: placeLinkInput.value };
  placeAddPopup.loading(true);
  serverDate
    .addNewCard(data)
    .then((result) => {
      addNewCardToMarkdown(result);
    })
    .catch((err) => console.log(err))
    .finally(() => placeAddPopup.loading(false));
};

const pushNewAvatar = () => {
  const link = avatarLinkInput.value;
  avatarPopup.loading(true);
  serverDate
    .setNewAvatar(link)
    .then(() => {
      userAvatar.src = link;
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.loading(false));
};

const openPlace = () => {
  formElementAdd.reset();
  addFormValidation.disableSubmitButton();
  placeAddPopup.open();
};

const openAvatarPopup = () => {
  formElementAvatar.reset();
  avatarPopup.open();
  avatarFormaValidate.disableSubmitButton();
};

buttonEdit.addEventListener('click', openProfile);
buttonAdd.addEventListener('click', openPlace);
avatarButton.addEventListener('click', openAvatarPopup);

const makeNewCard = (data) => {
  const card = new Card({
    data,
    userId,
    handleCardClick,
    handleDeleteCard: (id) => {
      closePopup.open();
      closePopup.setSubmitAction(() => {
        serverDate.deleteCard(id).then(() => {
          card.deleteCard();
          closePopup.close();
        });
      });
    },
    handlePutLike,
    handleDeleteLike,
  });
  const cardElement = card.generateCard(data);

  return cardElement;
};

const addNewCard = (data) => {
  newCard.addItem(makeNewCard(data));
};

const addNewCardToMarkdown = (data) => {
  newCard.addItemToMarkdown(makeNewCard(data));
};

const getMeAllCards = (mass) => {
  mass.forEach((item) => {
    newCard.addItem(makeNewCard(item));
  });
};

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

const handleDeleteCard = (evt) => {
  evt.target.closest('card').remove();
};

const deleteCardAccepted = () => {
  closePopup.open();
};

const handlePutLike = (id) => {
  return serverDate.likeCard(id);
};

const handleDeleteLike = (id) => {
  return serverDate.deleteLike(id);
};

Promise.all([serverDate.getInitialCards(), serverDate.getProfileInfo()])
  .then(([cards, userData]) => {
    userProfile.setUserInfo(userData);

    userId = userData._id;

    getMeAllCards(cards);
  })
  .catch((err) => console.log(err));

const edditPopup = new PopupWithForm(popEdit, editProfileInformation);
const placeAddPopup = new PopupWithForm(placePop, pushNewCard);
const imagePopup = new PopupWithImage(popupImageContainer);
const closePopup = new SubmitPopup(popupClose, deleteCardAccepted);
const avatarPopup = new PopupWithForm(avatarPop, pushNewAvatar);

edditPopup.setEventListeners();
placeAddPopup.setEventListeners();
imagePopup.setEventListeners();
closePopup.setEventListeners();
avatarPopup.setEventListeners();
