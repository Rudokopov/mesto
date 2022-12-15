const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submtit",
  inactiveButtonClass: "popup__form-submtit_disable",
  inputErrorClass: "popup__form-input-error",
};

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

const addFormValidation = new FormValidator(validationConfig, formElementAdd);
addFormValidation.enableValidation();

const editProfileFormaValidation = new FormValidator(
  validationConfig,
  formElementEdit
);
editProfileFormaValidation.enableValidation();

/*----------------------------Статичный функционал--------------------------------------*/

// Закрытие клавишей
const closePopupByEscKey = (evt) => {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
};
// Закрытие popup
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", handleCloseButtonEvent);
  document.removeEventListener("keydown", closePopupByEscKey);
};

const handleCloseButtonEvent = (evt) => {
  if (evt.target.classList.contains("popup__form-close-button")) {
    closePopup(evt.target.closest(".popup"));
  }
};
// Закрытие кликом на оверлей
popupList.forEach((item) => {
  item.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }
  });
});

// Открытие popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", handleCloseButtonEvent);
  document.addEventListener("keydown", closePopupByEscKey);
};

// Кнопки открытия popup
buttonEdit.addEventListener("click", () => {
  userInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  // editProfileFormaValidation.disableSubmitButton();
  openPopup(popEdit);
});

buttonAdd.addEventListener("click", () => {
  // const buttonSubmit = document.querySelector(".popup__form-submtit-place");
  formElementAdd.reset();
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

/*-----------------------------Открытие превью картинки-------------------------------------*/
const handlePreviewPicture = () => {
  const allImages = document.querySelectorAll(".card__image");
  allImages.forEach((item) => {
    item.addEventListener("click", () => {
      const popupImage = document.querySelector(".popup-image");
      popupImage.querySelector(".popup-image__photo").src = item.src;
      popupImage.querySelector(".popup-image__photo").alt = item.alt;
      popupImage.querySelector(".popup-image__text").textContent = item.alt;
      openPopup(popupImage);
    });
  });
};

/*---------------------Добавление карточки с формы-------------------------*/

function handleFormAddSubmit(evt) {
  evt.preventDefault();

  initialCards.name = placeNameInput.value;
  initialCards.image = placeLinkInput.value;

  const card = new Card(initialCards);
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
  handlePreviewPicture();
  closePopup(placePop);
}

formElementAdd.addEventListener("submit", handleFormAddSubmit);

const renderCards = () => {
  initialCards.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();

    // Добавляем карточки в DOM
    cardContainer.prepend(cardElement);
  });
};

renderCards();
handlePreviewPicture();
