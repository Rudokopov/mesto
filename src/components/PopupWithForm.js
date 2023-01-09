import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmitForm) {
    super(popup);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popup.querySelectorAll('.popup__form-input');
    // this._popupTextValue = this._popup.querySelector('.popup__form-place-name');
    // this._popupLinkValue = this._popup.querySelector('#popup__form-place-link');
  }

  close() {
    super.close();
    // console.log('salam');
  }

  _getInputValues() {
    this._data = {};
    this._inputList.forEach((item) => {
      return (this._data[item.id] = item.value);
    });
    return this._data;
  }
  // Прогоняем массив для установки значений в инпутах редактирования пользователя
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.id];
    });
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
