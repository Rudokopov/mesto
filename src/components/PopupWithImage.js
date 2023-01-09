import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector('.popup-image__photo');
    this._text = this._popup.querySelector('.popup-image__text');
  }

  open(image, name) {
    this._image.src = image;
    this._image.alt = name;
    this._text.textContent = name;
    super.open();
  }
}
