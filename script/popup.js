let userName = document.querySelector(".profile__user-name");
let userDescription = document.querySelector(".profile__user-description");
let popup = document.querySelector(".popup")
let edditButton = document.querySelector(".profile__edit-button")
let closeButton = document.querySelector(".popup__form-close-button")
let userInput = document.getElementById("#popup__form-user")
let descriptionInput = document.getElementById("#popup__form-user-description")
let formElement = document.querySelector(".popup__form")
let formSubmit = document.querySelector(".popup__form-submtit")

function openPop() {
  userInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  popup.classList.add('popup_opened');
}

function closePop() {
  popup.classList.remove('popup_opened');
} 

edditButton.addEventListener("click", () => {
  openPop(popup);
});

popup.addEventListener("click", (event) => {
  let isOverlay = event.target.classList.contains("popup");
  let isClose = event.target.classList.contains("popup__form-close-button");

  if (isOverlay || isClose) {
    closePop(popup)
  }
})

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = userInput.value
  userInput.value = userName.textContent
  userDescription.textContent = descriptionInput.value;
  descriptionInput.value = userDescription.textContent;
  closePop(popup)
}

formElement.addEventListener('submit', formSubmitHandler);

