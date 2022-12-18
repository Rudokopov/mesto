const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submtit",
  inactiveButtonClass: "popup__form-submtit_disable",
  inputErrorClass: "popup__form-input-error",
};

import { Card } from "./Card.js";
import FormValidator from "./FormValidator.js";
import { closePopup, openPopup } from "./utils.js";

const userName = document.querySelector(".profile__user-name");
const userDescription = document.querySelector(".profile__user-description");
const buttonEdit = document.querySelector(".profile__edit-button");
const userInput = document.querySelector("#popup__form-user-name");
const descriptionInput = document.querySelector(
  "#popup__form-user-description"
);
const placeNameInput = document.querySelector("#popup__form-place-name");
const placeLinkInput = document.querySelector("#popup__form-place-link");
const formElementEdit = document.querySelector(".popup__form-edit");
const formElementAdd = document.querySelector(".popup__form-add");
const buttonAdd = document.querySelector(".profile__add-button");

const cardContainer = document.querySelector(".cards");

const popupList = document.querySelectorAll(".popup");
const popEdit = document.querySelector(".popup-edit");
const placePop = document.querySelector(".popup-place");

export const popupImage = document.querySelector(".popup-image");

const addFormValidation = new FormValidator(validationConfig, formElementAdd);
addFormValidation.enableValidation();

const editProfileFormaValidation = new FormValidator(
  validationConfig,
  formElementEdit
);
editProfileFormaValidation.enableValidation();

/*----------------------------Статичный функционал--------------------------------------*/

// Закрытие кликом на оверлей
popupList.forEach((item) => {
  item.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }
  });
});

// Кнопки открытия popup
buttonEdit.addEventListener("click", () => {
  userInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(popEdit);
});

buttonAdd.addEventListener("click", () => {
  formElementAdd.reset();
  addFormValidation.disableSubmitButton();
  openPopup(placePop);
});
// Редактирование профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(popEdit);
}
formElementEdit.addEventListener("submit", handleFormEditSubmit);

const makeNewCard = () => {
  const card = new Card(initialCards);
  const cardElement = card.generateCard();
  return cardElement;
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

formElementAdd.addEventListener("submit", handleFormAddSubmit);

const renderCards = () => {
  initialCards.forEach((item) => {
    initialCards.name = item.name;
    initialCards.image = item.image;
    const cardElement = makeNewCard(initialCards.name, initialCards.image);
    cardContainer.prepend(cardElement);
  });
};

renderCards();

{
  popupImage;
}
