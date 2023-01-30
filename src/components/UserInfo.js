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
      avatar: this._avatar,
    };
    return this._data;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  changeAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
