// Импорты
import initialCards from "./scripts/cards.js";
import './blocks/styles.css';
import { openPopup, closePopup } from "./scripts/modal.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";

// DOM узлы
const content = document.querySelector('.content');

// AddCardPopUp
const openAddCardPopupButton = content.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const closeAddPopupButton = addCardPopup.querySelector('.popup__close');
const places = content.querySelector('.places__list');

// ImagePopup
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__caption')
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

// ChangeProfilePopup
const openChangeProfilePopupButton = document.querySelector('.profile__edit-button');
const changeProfilePopup = document.querySelector('.popup_type_edit');
const closeChangeProfilePopupButton = changeProfilePopup.querySelector('.popup__close');
const profile = document.querySelector('.profile__info');
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

// Формы
const cardForm = document.forms.newPlace;
const link = cardForm.elements.link;
const title = cardForm.elements.placeName;
const nicknameForm = document.forms.editProfile;
const name = nicknameForm.elements.name;
const description = nicknameForm.elements.description;

// Функция открытия изображения
function openImagePopup(evt) {
    const eventTarget = evt.target;
    const imageName = eventTarget.closest('.card');
    console.log(imageName);
    openPopup(imagePopup);
    popupImage.src = eventTarget.src;
    imagePopupTitle.textContent = imageName.textContent;
}

imagePopupCloseButton.addEventListener('click', function () {
    closePopup(imagePopup);
});

// Функция изменения профиля
openChangeProfilePopupButton.addEventListener('click', function () {
    openPopup(changeProfilePopup);
    name.value = profileName.textContent;
    description.value = profileDescription.textContent;
});

closeChangeProfilePopupButton.addEventListener('click', function () {
    closePopup(changeProfilePopup);
})

function changeName(nameValue, descriptionValue) {
    profileName.textContent = nameValue;
    profileDescription.textContent = descriptionValue;
    return profile;
}

nicknameForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    closePopup(changeProfilePopup);
    changeName(name.value, description.value);
    nicknameForm.reset();
});

// Открытие и закрытие addCardPopup
openAddCardPopupButton.addEventListener('click', function () {
    openPopup(addCardPopup);
});

closeAddPopupButton.addEventListener('click', function () {
    closePopup(addCardPopup)
});

// Вывести встроеные карточки на страницу
initialCards.forEach(function (element) {
    places.prepend(createCard(element.link, element.title, openImagePopup, deleteCard, likeCard));
});


// Вывести карточку на страницу
cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    closePopup(addCardPopup);
    places.prepend(createCard(link.value, title.value, openImagePopup, deleteCard, likeCard));
    cardForm.reset();
});