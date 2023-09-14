export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }).catch((err) => console.log(`${err}`)); 
  }

  getUser(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }).catch((err) => console.log(`${err}`)); 
  }

  updateUserInfo(data){
    const submitButton = document.querySelector(".popup__edit-button");
    submitButton.value = "Salvando...";
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => {
      if(res.ok){
        submitButton.value = "Salvar";
      }
    }).catch((err) => console.log(`${err}`)); 
    
  }

  likeCard(cardsId){
    return fetch(`${this._baseUrl}/cards/likes/${cardsId}`, {
      method: "PUT",
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err) => console.log(`${err}`));
  }

  dislikeCard(cardsId){
    return fetch(`${this._baseUrl}/cards/likes/${cardsId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err) => console.log(`${err}`));
  }

  addNewCard(data){
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err) => console.log(`${err}`));
  }

  updateAvatarPicture(avatar){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.link
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err) => console.log(`${err}`));
  }

  deletePicture(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }).catch((err) => console.log(`${err}`));
  }
}