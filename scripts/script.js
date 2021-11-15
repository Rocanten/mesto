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

let editPopup = document.querySelector('.edit-popup_action_edit')
let addPopup = document.querySelector('.edit-popup_action_add')
let photoPopup = document.querySelector('.photo-popup')
let editButton = document.querySelector('.profile__edit-button')
let addButton = document.querySelector('.profile__add-button')
let editCloseButton = editPopup.querySelector('.edit-popup__close')
let addCloseButton = addPopup.querySelector('.edit-popup__close')
let photoCloseButton = photoPopup.querySelector('.photo-popup__close')
let photoPopupImage = photoPopup.querySelector('.photo-popup__image')
let photoPopupCaption = photoPopup.querySelector('.photo-popup__caption')

let editFormElement = editPopup.querySelector('.edit-popup__form')
let nameInput = editFormElement.querySelector('.edit-popup__input_field_name')
let jobInput = editFormElement.querySelector('.edit-popup__input_field_description')

let addFormElement = addPopup.querySelector('.edit-popup__form')
let placeNameInput = addFormElement.querySelector('.edit-popup__input_field_place-name')
let placeLinkInput = addFormElement.querySelector('.edit-popup__input_field_place-link')

let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

let places = document.querySelector('.places')
const placeTemplate = document.querySelector('#place-template').content

function renderPlaces() {
    places.innerHTML = ''
    initialCards.forEach(function (card) {
        let placeElement = placeTemplate.cloneNode(true)
        placeElement.querySelector('.place__image').src = card.link
        placeElement.querySelector('.place__image').addEventListener('click', openPhotoPopup)
        placeElement.querySelector('.place__title').textContent = card.name
        placeElement.querySelector('.favourite-button').addEventListener('click', likePlace)
        placeElement.querySelector('.place__delete-button').addEventListener('click', deletePlace)
        places.append(placeElement)
    })
}

function likePlace(evt) {
    let favouriteButton = evt.target
    console.log(favouriteButton)
    if(favouriteButton.classList.contains('favourite-button_active')) {
        favouriteButton.classList.remove('favourite-button_active')
    } else {
        favouriteButton.classList.add('favourite-button_active')
    }
}

function deletePlace(evt) {
    let deleteButton = evt.target
    let placeToDelete = deleteButton.parentNode
    Array.from(places.children).forEach(function (element, index) {
        if(element.isEqualNode(placeToDelete)) {
            initialCards.splice(index, 1)
        }
    })
    renderPlaces()
}

function openPhotoPopup(evt) {
    let clickedImage = evt.target
    photoPopupImage.src = clickedImage.src
    photoPopupCaption.textContent = clickedImage.parentNode.querySelector('.place__title').textContent
    photoPopup.classList.add('photo-popup_opened')
}

function openEditPopup() {
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    editPopup.classList.add('edit-popup_opened')
}

function openAddPopup() {
    addPopup.classList.add('edit-popup_opened')
}

function closeEditPopup() {
    editPopup.classList.remove('edit-popup_opened')
}

function closeAddPopup() {
    addPopup.classList.remove('edit-popup_opened')
}

function closePhotoPopup() {
    photoPopup.classList.remove('photo-popup_opened')
}

function editFormSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    closeEditPopup()
}

function addFormSubmitHandler (evt) {
    evt.preventDefault();

    initialCards.unshift({
        name: placeNameInput.value,
        link: placeLinkInput.value
    })
    renderPlaces()
    closeAddPopup()
}

editButton.addEventListener('click', openEditPopup)
addButton.addEventListener('click', openAddPopup)
editCloseButton.addEventListener('click', closeEditPopup)
addCloseButton.addEventListener('click', closeAddPopup)
photoCloseButton.addEventListener('click', closePhotoPopup)
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

renderPlaces()