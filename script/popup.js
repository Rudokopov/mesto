let userName = document.querySelector(".profile__user-name");
let userDescription = document.querySelector(".profile__user-description");

let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__form-close-button');
let popupForm = popup.querySelector('.popup__form');
let userInput = popupForm.querySelector('.popup__form-user');
let userInputDescription = popupForm.querySelector('.popup__form-user-description');
let popUpSubmitButton = popupForm.querySelector('.popup__form-submtit');

userInput.value = userName.textContent;
userInputDescription.value = userDescription.textContent;

function popupOpen() {
  popupOpenButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
  });
  
  popupCloseButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
  });
}
popupOpen();

popupForm.onsubmit = function(evt) {
  evt.preventDefault();
  userName.textContent = userInput.value;
  userDescription.textContent = userInputDescription.value;
  popUpSubmitButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
  })
  popupForm.addEventListener('submit', formSubmitHandler); 
}
