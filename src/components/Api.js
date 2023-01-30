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

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkStatus);
  }

  changeProfileInfo({ author, info }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: author,
        about: info,
      }),
    });
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

  setNewAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }
}
