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

const toggleInputErrorState = (formElement, formInput, inputErrorClass) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, inputErrorClass)
  } else {
    hideInputError(formElement, formInput, inputErrorClass)
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
const setEventListeners = (formElement, validationConfig, inputErrorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  toggleButtonState(inputList, buttonElement)
  inputList.forEach(formInput => {
    formInput.addEventListener('input', () => {
      toggleInputErrorState(formElement, formInput, inputErrorClass)
      toggleButtonState(inputList, buttonElement);
    })
  })
}

// Добавляем всем формам слушатель
const enableFormValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach(formElement => {
    setEventListeners(formElement, validationConfig)
  })
}

// И снова добрый вечерочек, последняя интерация еще никогда так не держала в тонусе))
// Ждал ответа наставника, что бы сверить правки, так то я еще вчера все сделал, но выходные, никто не отвечал
// Запутался с этими конфигами, скорее риторический вопрос, строка 61, так получается у меня конфиг уже передан 
// Я думал было бы логичнее добавить так validationConfig.inputerrorclass (повесить сразу на toggle)
// Потом думаю, вы сказали лучше класс передать, этого достаточно, я собственно так и сделал, думаю так понятнее выглядит 
// А еще подумал, можно же в слушатель добавить (строка 60) inputerrorclass параметром, и передать его непосредственно на toggle
// Все эти варианты работают, я пытался сломать что бы собрать и разобраться, но ниче не сломалось xD, поэтому запутался
// Но щас вроде все встало на свои места, походу все оставшееся время до нового спринта буду курить объекты 
// Спасибо за прожарку, реально ценный опыт который заставляет вникать еще больше, прошлые ревью после вашего вообще не ощущались))
