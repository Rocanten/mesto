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
const editCloseButton = editPopup.querySelector('.popup__close')
const addCloseButton = addPopup.querySelector('.popup__close')
const photoCloseButton = photoPopup.querySelector('.popup__close')
const photoPopupImage = photoPopup.querySelector('.popup__image')
const photoPopupCaption = photoPopup.querySelector('.popup__caption')

const editFormElement = editPopup.querySelector('.popup__form')
const nameInput = editFormElement.querySelector('.popup__input_field_name')
const jobInput = editFormElement.querySelector('.popup__input_field_description')

const addFormElement = addPopup.querySelector('.popup__form')
const placeNameInput = addFormElement.querySelector('.popup__input_field_place-name')
const placeLinkInput = addFormElement.querySelector('.popup__input_field_place-link')

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

const places = document.querySelector('.places')
const placeTemplate = document.querySelector('#place-template').content

function createPlace(card) {
    const placeElement = placeTemplate.cloneNode(true)
    placeElement.querySelector('.place__title').textContent = card.name
    placeElement.querySelector('.place__image').src = card.link
    placeElement.querySelector('.place__image').alt = card.name
    placeElement.querySelector('.place__image').addEventListener('click', function (evt) {
        const element = evt.target.parentNode
        photoPopupImage.src = element.querySelector('.place__image').src
        photoPopupImage.alt = element.querySelector('.place__title').textContent
        photoPopupCaption.textContent = element.querySelector('.place__title').textContent
        openPopup(photoPopup)
    })
    placeElement.querySelector('.favourite-button').addEventListener('click', likePlace)
    placeElement.querySelector('.place__delete-button').addEventListener('click', deletePlace)
    return placeElement
}

function initPlaces(cards) {
    cards.forEach(function (card) {
        const newPlace = createPlace(card)
        places.prepend(newPlace)
    })
}

function likePlace(evt) {
    const favouriteButton = evt.target
    favouriteButton.classList.toggle('favourite-button_active')
}

function deletePlace(evt) {
    const deleteButton = evt.target
    const placeToDelete = deleteButton.parentNode
    placeToDelete.remove()
}

function openPopup(popup) {
    popup.classList.add('popup_opened')
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
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
    const newPlace = createPlace(card)
    places.prepend(newPlace)
    closePopup(addPopup)
    placeNameInput.value = ''
    placeLinkInput.value = ''
}

editButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    openPopup(editPopup)
})
addButton.addEventListener('click', function () {
    openPopup(addPopup)
})
editCloseButton.addEventListener('click', function () {
    closePopup(editPopup)
})
addCloseButton.addEventListener('click', function () {
    closePopup(addPopup)
})
photoCloseButton.addEventListener('click', function () {
    closePopup(photoPopup)
})
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

initPlaces(initialCards)