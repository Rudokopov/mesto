import Popup from './Popup';

export default class SubmitPopup extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('#close-form');
    this._acceptButton = document.querySelector('.popup__form-accept-button');
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
    super.setEventListeners();
  }
}
