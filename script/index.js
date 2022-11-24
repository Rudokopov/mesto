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
const card = document.querySelector('.card')
const cardTemplate = document.querySelector('#card').content.querySelector('.card')
const popupImage = document.querySelector('.popup-image')
const buttonLike = document.querySelector('.card__heart-button')
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
const removeCard = (card) => {
  card.remove()
}

const handleDeleteCardEvt = (evt) => {
  if (evt.target.classList.contains('card__trash-button')) {
    removeCard(evt.target.closest('.card'))
  }
}
// Закрытие клавишей
const isClosePopupKey = (evt) => {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened')
    closePopup(popupActive)
  }
}
// Закрытие popup
const closePopup = (popup) => {
  const formList = document.querySelectorAll('.popup__form')
  popup.classList.remove('popup_opened')
  popup.removeEventListener('click', handleCloseButtonEvent)

  formList.forEach(currentForm => {
    currentForm.reset()
  })
}

const handleCloseButtonEvent = (evt) => {
  if (evt.target.classList.contains('popup__form-close-button')) {
    closePopup(evt.target.closest('.popup'))
  }
}
// Закрытие кликом на оверлей
popupList.forEach(item => {
  item.addEventListener('click', (evt) => {
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
  document.addEventListener('keydown', isClosePopupKey)
  enableFormValidation()
}
// Кнопки открытия popup
buttonEdit.addEventListener('click', () => {
  userInput.value = userName.textContent
  descriptionInput.value = userDescription.textContent
  openPopup(popEdit)
})

buttonAdd.addEventListener('click', () => {
  openPopup(placePop)
})
// Редактирование профиля
function handleFormSubmitEdit (evt) {
  evt.preventDefault()
  userName.textContent = userInput.value
  userDescription.textContent = descriptionInput.value
  closePopup(popEdit)
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit)
// Добавление новой карточки 
function handleFormSubmitAdd (evt) {
  evt.preventDefault()
  initialCards.name = placeNameInput.value
  initialCards.link = placeLinkInput.value
  renderCard(initialCards)
  closePopup(placePop)
  document.querySelector('.popup__form-add').reset()
}

formElementAdd.addEventListener('submit', handleFormSubmitAdd)
// Лайк на карточке
const handleCardLike = (evt) => {
  evt.target.classList.toggle('card__heart-button_active')
}
// Отрытие попапа по новому
const handlePreviewPicture = (image) => {
  document.querySelector('.popup-image__photo').src = image.link
  document.querySelector('.popup-image__photo').alt = image.name
  document.querySelector('.popup-image__text').textContent = image.name
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