const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submtit',
  inactiveButtonClass: 'popup__form-submtit_disable',
  inputErrorClass: 'popup__form-input-error',
}; 

const showInputError = (formElement, formInput, errorMessage, inputErrorClass) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`)
  formInput.classList.add(inputErrorClass)
  formError.textContent = errorMessage
}

const hideInputError = (formElement, formInput, inputErrorClass) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`)
  formInput.classList.remove(inputErrorClass)
  formError.textContent = ''
}

const toggleInputErrorState = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage)
  } else {
    hideInputError(formElement, formInput)
  }
}

// Проверка всех полей формы на валидность 
const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
}

// Деактиватор кнопки 
const toggleButtonDisable = (buttonElement) => {
  buttonElement.setAttribute('disabled', true)
}
// Активатор кнопки
const toggleButtonActive = (buttonElement) => {
  buttonElement.removeAttribute('disabled')
}

// Переключатель кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    toggleButtonDisable(buttonElement)
  } else {
    toggleButtonActive(buttonElement)
  }
}

// Добавляем слушатели
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  toggleButtonState(inputList, buttonElement)
  inputList.forEach(formInput => {
    formInput.addEventListener('input', () => {
      toggleInputErrorState(formElement, formInput)
      toggleButtonState(inputList, buttonElement);
    })
  })
}

// Добавляем всем формам слушатель
const enableFormValidation = (validationConfig) => {
  const {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass} = validationConfig
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach(formElement => {
    setEventListeners(formElement, validationConfig)
  })
}

// Спасибо вам большое за то что так расписали каждый пункт, я реально не понимал в чем проблема
// Честно признаюсь я и сейчас не до конца понимаю все что касается объектов, которые хранят в себе другие параметры
// Я сделал как вы и сказали, поменял название в главном скрипте и глянул как поведет себя код
// Отталкиваясь от этого сделал по такому принципу, ну и заодно дошло что кнопкам можно просто Disable стилизовать xD
// Хотя я и сейчас не уверен в правильности своего решения, эта тема реально для меня слишком сложная :(