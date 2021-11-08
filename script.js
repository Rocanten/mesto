let editPopup = document.querySelector('.edit-popup')
let editButton = document.querySelector('.profile__edit-button')
let closeButton = document.querySelector('.edit-popup__close')

let formElement = document.querySelector('.edit-popup__form')
let nameInput = formElement.querySelector('.edit-popup__name')
let jobInput = formElement.querySelector('.edit-popup__description')

let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

nameInput.value = profileName.textContent
jobInput.value = profileDescription.textContent

function openEditPopup(evt) {
    editPopup.classList.add('edit-popup_opened')
}

function closeEditPopup(evt) {
    editPopup.classList.remove('edit-popup_opened')
}

editButton.addEventListener('click', openEditPopup)
closeButton.addEventListener('click', closeEditPopup)

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.

        // Получите значение полей jobInput и nameInput из свойства value
        let newName = nameInput.value
        let newDescription = jobInput.value
        profileName.textContent = newName
        profileDescription.textContent = newDescription
        closeEditPopup()
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);