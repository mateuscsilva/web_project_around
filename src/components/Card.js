import Api from "./Api";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";

class Card {
  constructor(data, templateName, api){
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateName = templateName;
    this._api = api;
  }

  _openPicture(evt){
    const popupImage = new PopupWithImage('.popup-image');
    popupImage.open(evt);
    /*
    setTimeout(() => {
      const page = document.querySelector('.page');
      const popupImage = document.querySelector('.popup-image');
      const displayImage = document.querySelector('.popup__display-image');
      const popupText = document.querySelector('.popup__text');
      popupText.textContent = evt.target.alt;
      displayImage.src = evt.target.src;
      displayImage.alt = evt.target.alt;
      page.classList.add('page__semitransparent');
      popupImage.classList.add('popup__opened');
    }, 250);
    */
  }

  _clickLikeButton(evt){
    evt.target.classList.toggle("cards__like-button-clicked");
    if(evt.target.classList.contains("cards__like-button-clicked")){
      const card = this._api.likeCard(this._id);
      card.then((res) =>{ 
        evt.target.nextElementSibling.textContent = res.likes.length;
      });
    }else{
      const card = this._api.dislikeCard(this._id);
      card.then((res) =>{ 
        evt.target.nextElementSibling.textContent = res.likes.length;
      });
    }
  }
  
  _clickDeleteButton(evt){
    const self = this;
    const deleteForm = new PopupWithForm({
      formSelector: '.popup-delete_card',
      handleFormSubmit: (formData) => {
        console.log(this);
        self._api.deletePicture(this._id)
        .then((res)=>{
          evt.target.closest('.cards__item').remove();
        });
      }
    });
    deleteForm.setEventListeners();
    deleteForm.open();
  }

  generateCard(userId){
    const cardTemplate = document.querySelector('#cards__template').content;
    const newCard = cardTemplate.querySelector(this._templateName).cloneNode(true);
    newCard.querySelector('.cards__picture').src = this._link;
    newCard.querySelector('.cards__picture').alt = this._name;
    newCard.querySelector('.cards__text').textContent = this._name;
    newCard.querySelector('.cards__like-count').textContent = this._likes.length;
    newCard.querySelector('.cards__picture-button').addEventListener("click", this._openPicture);
    newCard.querySelector('.cards__like-button').addEventListener("click", this._clickLikeButton.bind(this));
    if(userId == this._ownerId){
      newCard.querySelector('.cards__delete-button').addEventListener("click", this._clickDeleteButton.bind(this));
    }else{
      newCard.querySelector('.cards__delete-button').classList.add('cards__delete-button_disabled');
    }
    return newCard;
  }
}

export default Card;