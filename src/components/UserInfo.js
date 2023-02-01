export default class UserInfo {
  constructor({ name, description, avatar, id }) {
    this._userName = name;
    this._userDescription = description;
    this._avatar = avatar;
    this._id = id;
  }

  getUserInfo() {
    this._data = {
      user: this._userName.textContent,
      description: this._userDescription.textContent,
      avatar: this._avatar,
      id: this._id,
    };
    return this._data;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}
