 const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`)
  formInput.classList.add(validationConfig.inputErrorClass)
  formError.textContent = errorMessage
}

const hideInputError = (formElement, formInput) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`)
  formInput.classList.remove(validationConfig.inputErrorClass)
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
  buttonElement.classList.add(validationConfig.inactiveButtonClass)
  buttonElement.setAttribute('disabled', true)
}
// Активатор кнопки
const toggleButtonActive = (buttonElement) => {
  buttonElement.classList.remove(validationConfig.inactiveButtonClass)
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
const setEventListeners = (formElement) => {
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
const enableFormValidation = (arrayParameters) => {
  const {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass} = arrayParameters
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach(formElement => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass)
  })
}

enableFormValidation(validationConfig)