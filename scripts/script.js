let editPopup = document.querySelector('.edit-popup')
let editButton = document.querySelector('.profile__edit-button')
let closeButton = document.querySelector('.edit-popup__close')

let formElement = document.querySelector('.edit-popup__form')
let nameInput = formElement.querySelector('.edit-popup__name')
let jobInput = formElement.querySelector('.edit-popup__description')

let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

let newName
let newDescription

function openEditPopup(evt) {
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    editPopup.classList.add('edit-popup_opened')
}

function closeEditPopup(evt) {
    editPopup.classList.remove('edit-popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    newName = nameInput.value
    newDescription = jobInput.value
    profileName.textContent = newName
    profileDescription.textContent = newDescription
    closeEditPopup()
}

editButton.addEventListener('click', openEditPopup)
closeButton.addEventListener('click', closeEditPopup)
formElement.addEventListener('submit', formSubmitHandler);