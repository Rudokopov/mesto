import Popup from './Popup';

export default class SubmitPopup extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('#close-form');
    this._button = document.querySelector('.popup__form-accept-button');
  }

  // getId(id) {
  //   this._id = id;
  // }

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
