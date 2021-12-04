export class Card {
    constructor(data, selector, photoClickHandler) {
        this._data = data
        this._selector = selector
        this._photoClickHandler = photoClickHandler
    }

    generateCard() {
        this._element = this._getElement()
        this._findElements()
        this._setEventListeners()
        this._setData()
        return this._element
    }

    _getElement() {
        const element = document
            .querySelector(this._selector)
            .content
            .querySelector('.place')
            .cloneNode(true)
        return element
    }

    _findElements() {
        this._imageElement = this._element.querySelector('.place__image')
        this._favouriteButtonElement = this._element.querySelector('.favourite-button')
        this._deleteButtonElement = this._element.querySelector('.place__delete-button')
        this._titleElement = this._element.querySelector('.place__title')
    }

    _setEventListeners() {
        this._imageElement.addEventListener('click', () => {
            this._photoClickHandler(this._data)
        })
        this._favouriteButtonElement.addEventListener('click', this._likePlace)
        this._deleteButtonElement.addEventListener('click', this._deletePlace)
    }

    _likePlace(evt) {
        const favouriteButton = evt.target
        favouriteButton.classList.toggle('favourite-button_active')
    }

    _deletePlace(evt) {
        const deleteButton = evt.target
        const placeToDelete = deleteButton.parentNode
        placeToDelete.remove()
    }

    _setData() {
        this._imageElement.src = this._data.link
        this._imageElement.alt = this._data.name
        this._titleElement.textContent = this._data.name
    }
}