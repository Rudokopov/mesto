const popupImage = document.querySelector(".popup-image");

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

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", handleCloseButtonEvent);
  document.addEventListener("keydown", closePopupByEscKey);
};

export {
  popupImage,
  closePopupByEscKey,
  closePopup,
  handleCloseButtonEvent,
  openPopup,
};
