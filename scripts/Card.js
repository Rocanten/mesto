export class Card {
    constructor(data, selector, photoClickHandler) {
        this._data = data
        this._selector = selector
        this._photoClickHandler = photoClickHandler
    }

    _getElement() {
        const element = document
            .querySelector(this._selector)
            .content
            .querySelector('.place')
            .cloneNode(true)
        return element
    }

    generateCard() {
        this._element = this._getElement()
        this._setEventListeners()
        this._setData()
        return this._element
    }

    _setEventListeners() {
        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._photoClickHandler(this._data)
        })
        this._element.querySelector('.favourite-button').addEventListener('click', this._likePlace)
        this._element.querySelector('.place__delete-button').addEventListener('click', this._deletePlace)
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
        this._element.querySelector('.place__image').src = this._data.link
        this._element.querySelector('.place__title').textContent = this._data.name
    }
}