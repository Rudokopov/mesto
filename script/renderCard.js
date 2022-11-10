const cardContainer = document.querySelector('.cards')

// Шаблоны карт
const cardTemplate = document.querySelector('#card').content.querySelector('.card');

// Генерация карточки 
const generateCard = (item) => {
const newCard = cardTemplate.cloneNode(true)

const image = newCard.querySelector('.card__image')
image.src = item.link

const titile = newCard.querySelector('.card__description')
titile.textContent = item.name

return newCard
}

// Добавление карточки 
const renderCard = (item) => {
  cardContainer.prepend(generateCard(item))
}

// Прогон по массиву 
initialCards.forEach((item) => {
  renderCard(item)
})

const cardLikeHandler = () => {
    document.querySelector('.card__heart-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__heart-button_active')
    })
  }

cardLikeHandler()