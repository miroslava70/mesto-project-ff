import initialCards from "./scripts/cards.js";
import './blocks/styles.css';
import { popupOpen, popupClose } from "./scripts/modal.js";
import { places, addCard, deleteCard, likeCard } from "./scripts/card.js";
import { changeNameButton, namePopup, nicknameForm, changeName } from "./scripts/changeName.js";
// @todo: DOM узлы
const content = document.querySelector('.content');
const popupButton = content.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
const closeButton = addPopup.querySelector('.popup__close');
const cardForm = document.forms.newPlace;
const link = cardForm.elements.link;
const title = cardForm.elements.placeName;

popupButton.addEventListener('click', function () {
    popupOpen(addPopup);
});

closeButton.addEventListener('click', function () {
    popupClose(addPopup)
});

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    places.append(addCard(element.link, element.title, element.alt));
});


// @todo: Функция создания карточки
cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    popupClose(addPopup, cardForm);
    addCard(link.value, title.value);
    cardForm.reset();
});