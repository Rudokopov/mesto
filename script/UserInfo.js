export default class UserInfo {
  constructor({ name, description }) {
    this._userName = name;
    this._userDescription = description;
    console.log(name);
    console.log(description);
  }

  getUserInfo() {
    this._data = {
      user: this._userName.textContent,
      description: this._userDescription.textContent,
    };
    console.log(this._data);
    return this._data;
  }

  setUserInfo({ author, info }) {
    this._userName.textContent = author;
    this._userDescription.textContent = info;
  }
}
