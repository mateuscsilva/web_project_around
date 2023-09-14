import Popup from "./Popup";

export default class PopupWithImage extends Popup{
  constructor(selector){
    super(selector);
  }

  open(evt){
    super.setEventListeners();
    setTimeout(() => { 
      const displayImage = document.querySelector('.popup__display-image');
      const popupText = document.querySelector('.popup__text');
      popupText.textContent = evt.target.alt;
      displayImage.src = evt.target.src;
      displayImage.alt = evt.target.alt;
      super.open();
      //this._page.classList.add('page__semitransparent');
      //this._container.classList.add('popup__opened');
    }, 250);
    
  }
}