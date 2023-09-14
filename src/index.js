import "./page/index.css";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section";
import UserInfo from "./components/UserInfo";
import PopupWithForm from "./components/PopupWithForm";
import Api from "./components/Api";


//token: fbd44759-5f10-4694-9bff-f7e35b04f97b
//group ID: web_ptbr_06

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');
const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__name');
const workName = document.querySelector('.profile__work');

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_04",
  headers: {
    authorization: "fbd44759-5f10-4694-9bff-f7e35b04f97b",
    "Content-Type": "application/json"
  }
});

const initialUser = await api.getUser();
profileImage.src = initialUser.avatar;
profileName.textContent = initialUser.name;
workName.textContent = initialUser.about;

const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__work'
}, initialUser._id);

const initialCards = await api.getInitialCards();
const cardsContainer = new Section({
  item: initialCards, 
  renderer: (item)=>{
    const newCard = new Card(item, ".cards__item", api);
    const cardElement = newCard.generateCard(userInfo._id);
    cardsContainer.addItem(cardElement);
  }},
  '.cards');
cardsContainer.renderer();

function initalizeFormValidation(){
  const data = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "form__input_type_error",
    buttonInactiveClass: "button__inactive",
    errorClass: "form__error_visible",
    inputErrorClassActive: "form__input-error_active"
  } ;
  const editForm = new FormValidator(data,".popup__form-edit");
  editForm.enableValidation();
  const addForm = new FormValidator(data,".popup__form-add");
  addForm.enableValidation();
  const avatarForm = new FormValidator(data, ".popup__form-avatar");
  avatarForm.enableValidation();
}

initalizeFormValidation();


const addForm = new PopupWithForm({
  formSelector: '.popup-add', 
  handleFormSubmit: (formData) => {
    api.addNewCard(formData)
    .then((res) => {
      const card = new Card(res, ".cards__item", api);
      const cardElement = card.generateCard(userInfo._id);
      cardsContainer.addItem(cardElement);
    });
  }
});
addForm.setEventListeners();

const editForm = new PopupWithForm({
  formSelector: '.popup-edit', 
  handleFormSubmit: (formData) => {
    api.updateUserInfo(formData);
    userInfo.setUserInfo({name: formData.name, about: formData.about});
  }
});
editForm.setEventListeners();


const avatarForm = new PopupWithForm({
  formSelector: '.popup-avatar',
  handleFormSubmit: (formData) => {
    api.updateAvatarPicture(formData)
    .then((res)=>{
      document.querySelector('.profile__image').src = res.avatar;
    });
  }
});
avatarForm.setEventListeners();

function openPopupWindow(){
  editForm._setInputValues(userInfo.getUserInfo());
  editForm.open();
}


function openAddPopupWindow(){
  addForm.open();
}

function openAvatarPopupWindow(){
  avatarForm.open();
}

editButton.addEventListener("click", openPopupWindow);
addButton.addEventListener("click", openAddPopupWindow);
avatarButton.addEventListener("click", openAvatarPopupWindow);