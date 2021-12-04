export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings
        this._formElement = formElement
        this._findElements()
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._formElement);
    }

    resetValidation() {
        this._toggleButtonState()
        this._inputElements.forEach((inputElement) => {
            this._hideInputError(inputElement)
        })
    }

    _findElements() {
        this._inputElements = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector))
        this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector)
    }

    _setEventListeners() {
        this._toggleButtonState()
        const formValidator = this
        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                formValidator._checkInputValidity(inputElement);
                formValidator._toggleButtonState()
            });
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputElements)) {
            this._submitButton.classList.add(this._settings.inactiveButtonClass);
            this._submitButton.setAttribute('disabled', true)
        } else {
            this._submitButton.classList.remove(this._settings.inactiveButtonClass);
            this._submitButton.removeAttribute('disabled')
        }
    }

    _hasInvalidInput() {
        return this._inputElements.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
}