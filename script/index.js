const userName = document.querySelector('.profile__user-name')
const userDescription = document.querySelector('.profile__user-description')
const buttonEdit = document.querySelector('.profile__edit-button')
const userInput = document.querySelector('#popup__form-user-name')
const descriptionInput = document.querySelector('#popup__form-user-description')
const placeNameInput = document.querySelector('#popup__form-place-name')
const placeLinkInput = document.querySelector('#popup__form-place-link')
const formElementEdit = document.querySelector('.popup__form-edit')
const formElementAdd = document.querySelector('.popup__form-add')
const buttonAdd = document.querySelector('.profile__add-button')
const cardContainer = document.querySelector('.cards')
const cardTemplate = document.querySelector('#card').content.querySelector('.card')
const popupImage = document.querySelector('.popup-image')
const buttonLike = document.querySelector('.card__heart-button')
const popupPhoto = document.querySelector('.popup-image__photo')
const popupText = document.querySelector('.popup-image__text')
// все попапы сайта
const popupList = document.querySelectorAll('.popup')
const popEdit = document.querySelector('.popup-edit')
const placePop = document.querySelector('.popup-place')

// [В РАЗРАБОТКЕ] - Применение эффектов анимации после нажатия на объекту, для избежания появления артефактов при загрузке страницы
// const preloadAnimationCanceling = () => { 
//   popupList.forEach(popup => popup.classList.add('popup_opened')) 
// } 
// window.addEventListener('DOMContentLoaded', preloadAnimationCanceling)

// Удаление карточек
const handleDeleteCardEvt = (evt, card) => {
  if (evt.target.classList.contains('card__trash-button')) {
    evt.target.closest('.card').remove()
  }
}
// Закрытие клавишей
const closePopupByEscKey = (evt) => {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened')
    closePopup(popupActive)
  }
}
// Закрытие popup
const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  popup.removeEventListener('click', handleCloseButtonEvent)
  document.removeEventListener('keydown', closePopupByEscKey)
}

const handleCloseButtonEvent = (evt) => {
  if (evt.target.classList.contains('popup__form-close-button')) {
    closePopup(evt.target.closest('.popup'))
  }
}
// Закрытие кликом на оверлей
popupList.forEach(item => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item)
    }
  })
})

document.addEventListener('click', handleDeleteCardEvt)
// Открытие popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  popup.addEventListener('click', handleCloseButtonEvent)
  document.addEventListener('keydown', closePopupByEscKey)
}
// Кнопки открытия popup
buttonEdit.addEventListener('click', () => {
  userInput.value = userName.textContent
  descriptionInput.value = userDescription.textContent
  openPopup(popEdit)
})

buttonAdd.addEventListener('click', () => {
  const buttonSubmit = document.querySelector('.popup__form-submtit-place')
  toggleButtonDisable(buttonSubmit)
  formElementAdd.reset()
  openPopup(placePop)
})
// Редактирование профиля
function handleFormEditSubmit (evt) {
  evt.preventDefault()
  userName.textContent = userInput.value
  userDescription.textContent = descriptionInput.value
  closePopup(popEdit)
}

formElementEdit.addEventListener('submit', handleFormEditSubmit)
// Добавление новой карточки 
function handleFormAddSubmit (evt) {
  evt.preventDefault()
  initialCards.name = placeNameInput.value
  initialCards.link = placeLinkInput.value
  renderCard(initialCards)
  closePopup(placePop)
}

formElementAdd.addEventListener('submit', handleFormAddSubmit)
// Лайк на карточке
const handleCardLike = (evt) => {
  evt.target.classList.toggle('card__heart-button_active')
}
// Отрытие попапа по новому
const handlePreviewPicture = (image) => {
  popupPhoto.src = image.link
  popupPhoto.alt = image.name
  popupText.textContent = image.name
}
// Генерация карточки 
const createCard = (item) => {
  const cardNew = cardTemplate.cloneNode(true)

  const image = cardNew.querySelector('.card__image')
  image.src = item.link
  image.alt = item.name

  const titile = cardNew.querySelector('.card__description')
  titile.textContent = item.name

  const buttonLike = cardNew.querySelector('.card__heart-button')
  buttonLike.addEventListener('click', handleCardLike)

  image.addEventListener('click', () => {
    openPopup(popupImage)
    handlePreviewPicture(item)
  })
  
  return cardNew
  }
// Добавление карточки 
const renderCard = (item) => {
  cardContainer.prepend(createCard(item))
}
// Прогон по массиву 
initialCards.forEach((item) => {
  renderCard(item)
})

enableFormValidation(validationConfig)