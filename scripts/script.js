let editPopup = document.querySelector('.edit-popup')
let editButton = document.querySelector('.profile__edit-button')
let closeButton = document.querySelector('.edit-popup__close')

let formElement = document.querySelector('.edit-popup__form')
let nameInput = formElement.querySelector('.edit-popup__input_field_name')
let jobInput = formElement.querySelector('.edit-popup__input_field_description')

let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

function openEditPopup() {
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    editPopup.classList.add('edit-popup_opened')
}

function closeEditPopup() {
    editPopup.classList.remove('edit-popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    closeEditPopup()
}

editButton.addEventListener('click', openEditPopup)
closeButton.addEventListener('click', closeEditPopup)
formElement.addEventListener('submit', formSubmitHandler);