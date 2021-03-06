import { FormValidator } from './FormValidator.js'
import { Card } from "./Card.js";

const settings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save',
    inactiveButtonClass: 'form__save_disabled',
    inputErrorClass: 'form__input_error',
    errorClass: 'form__input-error_active'
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const editPopup = document.querySelector('.popup_action_edit')
const addPopup = document.querySelector('.popup_action_add')
const photoPopup = document.querySelector('.popup_action_photo')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const photoPopupImage = photoPopup.querySelector('.popup__image')
const photoPopupCaption = photoPopup.querySelector('.popup__caption')

const editFormElement = editPopup.querySelector('.form')
const nameInput = editFormElement.querySelector('.form__input_field_name')
const jobInput = editFormElement.querySelector('.form__input_field_description')

const addFormElement = addPopup.querySelector('.form')
const placeNameInput = addFormElement.querySelector('.form__input_field_place-name')
const placeLinkInput = addFormElement.querySelector('.form__input_field_place-link')

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

const places = document.querySelector('.places')

const formList = Array.from(document.querySelectorAll('.form'));

const popups = document.querySelectorAll('.popup')

const editForm = editPopup.querySelector('.form')
const cardForm = addPopup.querySelector('.form')

const editFormValidator = new FormValidator(settings, editForm);
const cardFormValidator = new FormValidator(settings, cardForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

function initPlaces(cards) {
    cards.forEach(function (card) {
        const placeElement = createCard(card)
        renderCard(placeElement)
    })
}

function createCard(cardData) {
    const card = new Card(cardData, '#place-template', clickPhoto)
    return card.generateCard()
}

function renderCard(cardElement) {
    places.prepend(cardElement)
}

function openPopup(popup) {
    document.addEventListener('keydown', escKeydownHandler)
    popup.classList.add('popup_opened')
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', escKeydownHandler)
}

function editFormSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    closePopup(editPopup)
}

function addFormSubmitHandler (evt) {
    evt.preventDefault();
    const card = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    }
    const newPlace = new Card(card, '#place-template', clickPhoto)
    const placeElement = newPlace.generateCard()
    places.prepend(placeElement)
    closePopup(addPopup)
    placeNameInput.value = ''
    placeLinkInput.value = ''
    cardFormValidator.resetValidation()
}

function clickPhoto(data) {
    photoPopupImage.src = data.link
    photoPopupImage.alt = data.name
    photoPopupCaption.textContent = data.name
    openPopup(photoPopup)
}

editButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    editFormValidator.resetValidation()
    openPopup(editPopup)
})
addButton.addEventListener('click', function () {
    cardFormValidator.resetValidation()
    openPopup(addPopup)
})

function addPopupCloseListeners() {
    popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup)
            }
            if (evt.target.classList.contains('popup__close')) {
                closePopup(popup)
            }
        })
    })
}

const escKeydownHandler = (evt) => {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    }
}

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

addPopupCloseListeners()

initPlaces(initialCards)
