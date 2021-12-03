export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings
        this._formElement = formElement
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._formElement);
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._settings.inputSelector));
        const buttonElement = formElement.querySelector(this._settings.submitButtonSelector)
        this._toggleButtonState(inputList, buttonElement)
        const formValidator = this
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                formValidator._checkInputValidity(formElement, inputElement);
                formValidator._toggleButtonState(inputList, buttonElement)
            });
        });
    }

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._settings.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true)
        } else {
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
            buttonElement.removeAttribute('disabled')
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
}