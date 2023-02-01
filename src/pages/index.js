/* Ахахаха, а мы думали кто то из вас сын)) А оказывается братья, ну блин круто! Спасибо еще раз за то что делаете для нас
Вы реально самые топовые из топовых, я бы в вашу тусовку пошел кнопки красить взамен на ценные знания xD
*/

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
  buttonAdd,
  cardContainer,
  popEdit,
  placePop,
  popupImageContainer,
  userAvatar,
  popupClose,
  avatarPop,
  avatarButton,
  cardTemplate,
} from '../utils/constants';

import SubmitPopup from '../components/SubmitPopup.js';

const apiService = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '0aba71cc-fce9-4c39-b3b0-8b4459f050db',
    'Content-Type': 'application/json',
  },
});

let userId = '';

const formValidators = {};

// Включение валидации
const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.currentForm)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, validationConfig);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

/*----------------------------Статичный функционал--------------------------------------*/

const userProfile = new UserInfo({
  name: userName,
  description: userDescription,
  avatar: userAvatar,
  id: userId,
});

const openProfile = () => {
  const data = userProfile.getUserInfo();
  edditPopup.setInputValues(data);
  formValidators['form-edit'].resetValidation();
  formValidators['form-edit'].disableSubmitButton();

  edditPopup.open();
};

// Добавляет изменения в форму пользователя
const editProfileInformation = () => {
  edditPopup.loading(true);
  apiService
    .changeProfileInfo(edditPopup.getInputValues())
    .then((result) => {
      userProfile.setUserInfo(result);
      edditPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => edditPopup.loading(false));
};

const pushNewCard = () => {
  placeAddPopup.loading(true);
  apiService
    .addNewCard(placeAddPopup.getInputValues())
    .then((result) => {
      cardSection.addItem(result);
      placeAddPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => placeAddPopup.loading(false));
};

const pushNewAvatar = () => {
  avatarPopup.loading(true);
  apiService
    .setNewAvatar(avatarPopup.getInputValues())
    .then((result) => {
      userProfile.setUserInfo(result);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.loading(false));
};

const openPlace = () => {
  placeAddPopup.open();
  formValidators['form-place'].resetValidation();
};

const openAvatarPopup = () => {
  avatarPopup.open();
  formValidators['form-avatar'].resetValidation();
};

buttonEdit.addEventListener('click', openProfile);
buttonAdd.addEventListener('click', openPlace);
avatarButton.addEventListener('click', openAvatarPopup);

const makeNewCard = (data) => {
  const card = new Card({
    data,
    userId,
    cardTemplate,
    handleCardClick,
    handleDeleteCard: (id) => {
      confirmationPopup.open();
      confirmationPopup.setSubmitAction(() => {
        apiService
          .deleteCard(id)
          .then(() => {
            card.deleteCard();
            confirmationPopup.close();
          })
          .catch((err) => console.log(err));
      });
    },
    handlePutLike,
    handleDeleteLike,
  });
  const cardElement = card.generateCard(data);

  return cardElement;
};

const cardSection = new Section(
  {
    renderer: (item) => {
      const card = makeNewCard(item);
      return card;
    },
  },
  cardContainer
);

/*---------------------Открытие попапа с картинкой-------------------------*/
const handleCardClick = (image, name) => {
  imagePopup.open(image, name);
};

const deleteCardAccepted = () => {
  confirmationPopup.open();
};

const handlePutLike = (id) => {
  return apiService.likeCard(id).catch((err) => console.log(err));
};

const handleDeleteLike = (id) => {
  return apiService.deleteLike(id).catch((err) => console.log(err));
};

Promise.all([apiService.getInitialCards(), apiService.getProfileInfo()])
  .then(([cards, userData]) => {
    userProfile.setUserInfo(userData);

    userId = userData._id;
    cardSection.renderItems(cards);
  })
  .catch((err) => console.log(err));

const edditPopup = new PopupWithForm(popEdit, editProfileInformation);
const placeAddPopup = new PopupWithForm(placePop, pushNewCard);
const imagePopup = new PopupWithImage(popupImageContainer);
const confirmationPopup = new SubmitPopup(popupClose, deleteCardAccepted);
const avatarPopup = new PopupWithForm(avatarPop, pushNewAvatar);

edditPopup.setEventListeners();
placeAddPopup.setEventListeners();
imagePopup.setEventListeners();
confirmationPopup.setEventListeners();
avatarPopup.setEventListeners();
