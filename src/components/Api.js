class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    // ...
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '0aba71cc-fce9-4c39-b3b0-8b4459f050db',
    'Content-Type': 'application/json',
  },
});
