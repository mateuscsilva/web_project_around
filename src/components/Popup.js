export default class Popup{
  constructor(selector){
    this._selector = selector;
    this._container = document.querySelector(selector);
    this._page = document.querySelector('.page');
    this._closeButton = document.querySelector(selector).children[0];
  }

  open(){
    setTimeout(() => { 
      this._page.classList.add('page__semitransparent');
      this._container.classList.add('popup__opened');
    }, 50);
  }

  close(){ 
    this._page.classList.remove('page__semitransparent');
    this._container.classList.remove('popup__opened');
  }
  
  _handleEscClose(e){
    if(e.key === "Escape"){
      this.close();
    }
  }

  _closeAfterButtonClick(e){
    const isClosest = e.target.closest(this._selector);
      if (isClosest) {
        this.close();
      }
  }

  _closeAfterClickOutsidePopup(e){
    const isClosest = e.target.closest(this._selector);
      if (!isClosest) {
        this.close();
      }
  }

  setEventListeners(){
    this._closeButton.addEventListener("click", this._closeAfterButtonClick.bind(this));
    this._closeButton.removeEventListener("click", this._closeAfterButtonClick.bind(this));
    document.addEventListener("click", this._closeAfterClickOutsidePopup.bind(this));
    document.removeEventListener("click", this._closeAfterClickOutsidePopup.bind(this));
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }
}