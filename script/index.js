const userName = document.querySelector('.profile__user-name')
const userDescription = document.querySelector('.profile__user-description')
const buttonEdit = document.querySelector('.profile__edit-button')
const userInput = document.getElementById('#popup__form-user')
const descriptionInput = document.getElementById('#popup__form-user-description')
const placeNameInput = document.getElementById('#popup__form-place-name')
const placeLinkInput = document.getElementById('#popup__form-place-link')
const formElementEdit = document.querySelector('.popup__form-edit')
const formElementAdd = document.querySelector('.popup__form-add')
const buttonAdd = document.querySelector('.profile__add-button')
const cardContainer = document.querySelector('.cards')
const card = document.querySelector('.card')
const cardTemplate = document.querySelector('#card').content.querySelector('.card')
const popupImage = document.querySelector('.popup-image')
const buttonLike = document.querySelector('.card__heart-button')
// все попы сайта
const popupList = document.querySelectorAll('div.popup')
const popEdit = document.querySelector('.popup-edit')
const placePop = document.querySelector('.popup-place')

// [В РАЗРАБОТКЕ]
// Цикл для навешивания класса _active, для устранения эффекта появления всплывающих элементов при обновлении страницы
// Это потому что я забыл вернуть обратно анимации на popup's xD пока пытался реализовать эту функцию))
// Вообще я в Chrome смотрю, открываю инструменты разработчика и при обновлении страницы можно поймать эффект исчезающих элементов
// Посоветовали циклом навешать на все элементы анимацию, что бы по необходимости срабатывали, но я не доделал еще эту функцию, что бы не заставили убирать )
// const preloadAnimationCanceling = () => { 
//   popupList.forEach(popup => popup.classList.add('popup_opened')) 
// } 
// window.addEventListener('DOMContentLoaded', preloadAnimationCanceling)



// Удаление карточек
const cardRemove = (card) => {
  card.remove()
}

const cardRemoveEvent = (evt) => {
  if (evt.target.classList.contains('card__trash-button')) {
    cardRemove(evt.target.closest('.card'))
  }
}

document.addEventListener('click', cardRemoveEvent)
// Открытие popup
const popupOpen = (popup) => {
  popup.classList.add('popup_opened')
  popup.addEventListener('click', buttonCloseEvent)
}
// Закрытие popup
const popupClose = (popup) => {
  popup.classList.remove('popup_opened')
  popup.removeEventListener('click', buttonCloseEvent) 
}

const buttonCloseEvent = (evt) => {
  if (evt.target.classList.contains('popup__form-close-button')) {
    popupClose(evt.target.closest('.popup'))
  }
}
// Кнопки открытия popup
buttonEdit.addEventListener('click', () => {
  userInput.value = userName.textContent
  descriptionInput.value = userDescription.textContent
  popupOpen(popEdit)
})

buttonAdd.addEventListener('click', () => {
  popupOpen(placePop)
})
// Редактирование профиля
function handleFormSubmitEdit (evt) {
  evt.preventDefault()
  userName.textContent = userInput.value
  userDescription.textContent = descriptionInput.value
  popupClose(popEdit)
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit)
// Добавление новой карточки 
function handleFormSubmitAdd (evt) {
  evt.preventDefault()
  initialCards.name = placeNameInput.value
  initialCards.link = placeLinkInput.value
  cardRender(initialCards)
  popupClose(placePop)
  document.querySelector('.popup__form-add').reset()
}

formElementAdd.addEventListener('submit', handleFormSubmitAdd)
// Лайк на карточке
const handleCardLike = (evt) => {
  evt.target.classList.toggle('card__heart-button_active')
}
// Отрытие попапа по новому
const imageRender = (image) => {
  document.querySelector('.popup-image__photo').src = image.link
  document.querySelector('.popup-image__photo').alt = image.name
  document.querySelector('.popup-image__text').textContent = image.name
}
// Генерация карточки 
const cardGenerate = (item) => {
  const cardNew = cardTemplate.cloneNode(true)

  const image = cardNew.querySelector('.card__image')
  image.src = item.link
  image.alt = item.name

  const titile = cardNew.querySelector('.card__description')
  titile.textContent = item.name

  const buttonLike = cardNew.querySelector('.card__heart-button')
  buttonLike.addEventListener('click', handleCardLike)

  image.addEventListener('click', () => {
    popupOpen(popupImage)
    imageRender(item)
    })
  
  return cardNew
  }
// Добавление карточки 
const cardRender = (item) => {
  cardContainer.prepend(cardGenerate(item))
}
// Прогон по массиву 
initialCards.forEach((item) => {
  cardRender(item)
})