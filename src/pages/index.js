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

// const formValidators = {};

// // Включение валидации
// const enableValidation = (validationConfig) => {
//   const formList = Array.from(
//     document.querySelectorAll(validationConfig.currentForm)
//   );
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(formElement, validationConfig);
//     // получаем данные из атрибута `name` у формы
//     const formName = formElement.getAttribute('name');

//     // вот тут в объект записываем под именем формы
//     formValidators[formName] = validator;
//     validator.enableValidation();
//   });
// };

// enableValidation(validationConfig);

const addFormValidation = new FormValidator(formElementAdd, validationConfig);
addFormValidation.enableValidation();

const editProfileFormaValidation = new FormValidator(
  formElementEdit,
  validationConfig
);
editProfileFormaValidation.enableValidation();

const avatarFormaValidate = new FormValidator(
  formElementAvatar,
  validationConfig
);

avatarFormaValidate.enableValidation();

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
  editProfileFormaValidation.disableSubmitButton();

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
      addNewCardToMarkdown(result);
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
  addFormValidation.disableSubmitButton();
  placeAddPopup.open();
};

const openAvatarPopup = () => {
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

const addNewCard = (data) => {
  newCard.addItem(makeNewCard(data));
};

const addNewCardToMarkdown = (data) => {
  newCard.addItemToMarkdown(makeNewCard(data));
};

// const getMeAllCards = (mass) => {
//   mass.forEach((item) => {
//     newCard.addItem(makeNewCard(item));
//   });
// };

const newCard = new Section(
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
  return apiService.likeCard(id);
};

const handleDeleteLike = (id) => {
  return apiService.deleteLike(id);
};

Promise.all([apiService.getInitialCards(), apiService.getProfileInfo()])
  .then(([cards, userData]) => {
    userProfile.setUserInfo(userData);

    userId = userData._id;
    newCard.renderItems(cards);
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
