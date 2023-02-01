import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmitForm) {
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popup.querySelectorAll('.popup__form-input');

    this._popupButton = this._popup.querySelector('.popup__form-submtit');
    this._popupButtonValue = this._popupButton.value;
  }

  _getInputValues() {
    this._data = {};
    this._inputList.forEach((item) => {
      return (this._data[item.id] = item.value);
    });
    return this._data;
  }

  loading(isLoading) {
    if (isLoading) {
      this._popupButton.value = 'Сохранение...';
    } else {
      this._popupButton.value = this._popupButtonValue;
    }
  }
  // Прогоняем массив для установки значений в инпутах редактирования пользователя
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.id];
    });
  }

  close() {
    super.close(),
      setTimeout(() => {
        this._form.reset();
      }, 500); // Сделал задержку, потому что при изменении в форме пользователя после сохранения поля сразу очищаются)
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }
}
