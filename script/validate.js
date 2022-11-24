const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`)
  formInput.classList.add('popup__form-input-error');
  formError.textContent = errorMessage
}

const hideInputError = (formElement, formInput) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`)
  formInput.classList.remove('popup__form-input-error');
  formError.textContent = ''
}

const isValid = (formElement, formInput) => {
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

// Активатор кнопки 
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__form-submtit_disable')
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove('popup__form-submtit_disable')
    buttonElement.removeAttribute('disabled')
  }
}

// Добавляем слушатели
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
  const buttonElement = formElement.querySelector('.popup__form-submtit')
  toggleButtonState(inputList, buttonElement)
  inputList.forEach(formInput => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput)
      
      toggleButtonState(inputList, buttonElement);
    })
  })
}

// Добавляем всем формам слушатель
const enableFormValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach(formElement => {
    setEventListeners(formElement)
  })
}

enableFormValidation()