import { info } from 'autoprefixer';

export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getMyUserId() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkStatus);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._checkStatus);
  }

  addNewCard({ name, image }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: image,
      }),
    }).then(this._checkStatus);
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkStatus);
  }

  changeProfileInfo({ user, description }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user,
        about: description,
      }),
    }).then(this._checkStatus);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkStatus);
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkStatus);
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkStatus);
  }

  setNewAvatar({ imageAvatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageAvatar,
      }),
    }).then(this._checkStatus);
  }
}
