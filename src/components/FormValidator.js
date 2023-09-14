class FormValidator {
  constructor(data, formElement){
    this.data = data;
    this.formElement = formElement;
  }
  
  translationsInPT = {
    text: {
      tooShort: "Mínimo de 2 caracteres ou mais",
      valueMissing: "Preencha este campo",
      typeMismatch: "Insira um texto"
    },
    url: {
      tooShort: "Por favor, insira um endereço web",
      valueMissing: "Por favor, insira um endereço web",
      typeMismatch: "Por favor, insira um endereço web"
    }
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.data.inputErrorClassActive);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.data.inputErrorClass);
    errorElement.classList.remove(this.data.inputErrorClassActive);
    errorElement.textContent = "";
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      let validationMessage = inputElement.validationMessage;
      if(inputElement.validity.tooShort){
        validationMessage = this.translationsInPT[inputElement.type]['tooShort']
      }else if(inputElement.validity.valueMissing){
        validationMessage = this.translationsInPT[inputElement.type]['valueMissing']
      }else if(inputElement.validity.typeMismatch){
        validationMessage = this.translationsInPT[inputElement.type]['typeMismatch']
      }
      
      this._showInputError(formElement, inputElement, validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.data.buttonInactiveClass);
      buttonElement.setAttribute("disabled", "")
    }else {
      buttonElement.classList.remove(this.data.buttonInactiveClass);
      buttonElement.removeAttribute("disabled")
    } 
  }

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this.data.inputSelector));
    const buttonElement = formElement.querySelector(this.data.submitButtonSelector);
    
    this._toggleButtonState(inputList, buttonElement);
    const self = this;
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        self._checkInputValidity(formElement, inputElement);
        self._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this.formElement));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  };

}

export default FormValidator;