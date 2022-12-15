export default class FormValidator {
  constructor(validationConfig, currentForm) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;

    this._currentForm = currentForm;

    this._inputList = Array.from(
      this._currentForm.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._currentForm.querySelector(
      this._submitButtonSelector
    );
  }

  /*------------------------------Устанавливаем слушатели------------------------------------*/

  _setIventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleInputErrorState(inputElement);
        this._toggleButtonState();
      });
    });
  }

  /*------------------------------Функции------------------------------------*/

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._currentForm.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._currentForm.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _toggleInputErrorState(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else this._hideInputError(inputElement);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  /*---------------Публичные методы для активации валидации и дизаейбла/анейбла кнопки---------------*/

  disableSubmitButton() {
    this._buttonElement.setAttribute("disabled", true);
  }

  enableSubmitButton() {
    this._buttonElement.removeAttribute("disabled");
  }

  enableValidation() {
    this._setIventListeners();
  }
}
