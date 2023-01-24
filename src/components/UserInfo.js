export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._userName = name;
    this._userDescription = description;
    this._avatar = avatar;
  }

  getUserInfo() {
    this._data = {
      user: this._userName.textContent,
      description: this._userDescription.textContent,
    };
    return this._data;
  }

  setUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-58/users/me', {
      headers: {
        authorization: '0aba71cc-fce9-4c39-b3b0-8b4459f050db',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        this._userName.textContent = result.name;
        this._userDescription.textContent = result.about;
        this._avatar.src = result.avatar;
      });
  }
}
