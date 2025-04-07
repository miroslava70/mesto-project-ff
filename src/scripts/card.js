import { popupOpen, popupClose } from "./modal";

const places = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(linkValue, nameValue, altValue) {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const cardName = card.querySelector('.card__title');
    const imagePopup = document.querySelector('.popup_type_image');
    const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

    cardImage.src = linkValue;
    cardName.textContent = nameValue;
    cardImage.alt = altValue;

    cardImage.addEventListener('click', function () {
        popupOpen(imagePopup);
        imagePopup.querySelector('.popup__image').src = cardImage.src;
        imagePopup.querySelector('.popup__caption').textContent = cardName.textContent;
    });


    imagePopupCloseButton.addEventListener('click', function () {
        popupClose(imagePopup);
    });

    deleteButton.addEventListener('click', function () {
        deleteCard(card);
    });

    likeButton.addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        likeCard(eventTarget)
    });

    places.append(card);
    return card;

};


// @todo: Функция удаления карточки
function deleteCard(item) {
    item.remove();
}

function likeCard(item) {
    item.classList.toggle('card__like-button_is-active');
}

export { places, addCard, deleteCard, likeCard };