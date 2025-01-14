import Popup from './Popup';

export default class SubmitPopup extends Popup {
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
