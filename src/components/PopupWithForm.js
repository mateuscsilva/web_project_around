import Popup from "./Popup";

export default class PopupWithForm extends Popup{
 constructor({ formSelector, handleFormSubmit }){
  super(formSelector);
  this._handleFormSubmit = handleFormSubmit;
  this._inputList = this._container.querySelectorAll(".form__input");
 }

 _getInputValues(){
  this._formValues = {};
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues;
 }

 _setInputValues(formValues){
  this._inputList.forEach(function(input){
    input.placeholder = formValues[input.name];
    return input;
  });
 }

 _reset(){
  this._inputList.forEach(input => {
    input.value = "";
  });
 }

 setEventListeners(){
  super.setEventListeners();
  this._container.addEventListener("submit", (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  });
 }

 close(){
  this._reset();
  super.close();
 }
}