const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submtit",
  inactiveButtonClass: "popup__form-submtit_disable",
  inputErrorClass: "popup__form-input-error",
};

const showInputError = (
  formElement,
  formInput,
  errorMessage,
  inputErrorClass
) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
};

const hideInputError = (formElement, formInput, inputErrorClass) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(inputErrorClass);
  formError.textContent = "";
};

const toggleInputErrorState = (formElement, formInput, inputErrorClass) => {
  if (!formInput.validity.valid) {
    showInputError(
      formElement,
      formInput,
      formInput.validationMessage,
      inputErrorClass
    );
  } else {
    hideInputError(formElement, formInput, inputErrorClass);
  }
};

// Проверка всех полей формы на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

// Деактиватор кнопки
const toggleButtonDisable = (buttonElement) => {
  buttonElement.setAttribute("disabled", true);
};
// Активатор кнопки
const toggleButtonActive = (buttonElement) => {
  buttonElement.removeAttribute("disabled");
};

// Переключатель кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    toggleButtonDisable(buttonElement);
  } else {
    toggleButtonActive(buttonElement);
  }
};

// Добавляем слушатели
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      toggleInputErrorState(
        formElement,
        formInput,
        validationConfig.inputErrorClass
      );
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Добавляем всем формам слушатель
const enableFormValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};
