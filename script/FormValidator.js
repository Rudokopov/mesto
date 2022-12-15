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

// const validationConfig = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__form-input",
//   submitButtonSelector: ".popup__form-submtit",
//   inactiveButtonClass: "popup__form-submtit_disable",
//   inputErrorClass: "popup__form-input-error",
// };

// class FormValidator {
//   constructor(validationConfig, currentForm) {
//     this._element = currentForm;
//     this._input = this._element.querySelector(".popup__form-input");
//     this._submitBtn = this._element.querySelector(".popup__form-submtit");
//   }

//   _setEventListeners() {
//     this._input.Array.from(
//       this._element.querySelectorAll(validationConfig.inputSelector)
//     );

//     const buttonElement = this._submitBtn;
//     this._input.addEventListener("input", () => {
//       this._toggleButtonState();
//     });
//   }

//   _showInputError(currentForm, formInput, errorMessage, inputErrorClass) {
//     const formError = currentForm.querySelector(`.${formInput.id}-error`);
//     formInput.classList.add(inputErrorClass);
//     formError.textContent = errorMessage;
//   }

//   _hideInputError(formElement, formInput, inputErrorClass) {
//     const formError = formElement.querySelector(`.${formInput.id}-error`);
//     formInput.classList.remove(inputErrorClass);
//     formError.textContent = "";
//   }

//   _toggleInputErrorState(formElement, formInput, inputErrorClass) {
//     if (!formInput.validity.valid) {
//       showInputError(
//         formElement,
//         formInput,
//         formInput.validationMessage,
//         inputErrorClass
//       );
//     } else {
//       hideInputError(formElement, formInput, inputErrorClass);
//     }
//   }

//   _hasInvalidInput(inputList) {
//     return inputList.some((formInput) => {
//       return !formInput.validity.valid;
//     });
//   }

//   _toggleButtonDisable(buttonElement) {
//     buttonElement.setAttribute("disabled", true);
//   }

//   _toggleButtonActive(buttonElement) {
//     buttonElement.removeAttribute("disabled");
//   }

//   _toggleButtonState(inputList, buttonElement) {
//     if (hasInvalidInput(inputList)) {
//       toggleButtonDisable(buttonElement);
//     } else {
//       toggleButtonActive(buttonElement);
//     }
//   }
// }
