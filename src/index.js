// Импорты
import './blocks/styles.css';
import { openPopup, closePopup } from "./scripts/modal.js";
import { createCard, deleteCard, likeCard, myID } from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { loadProfileAPI, loadCardsAPI, changeProfileAPI, changeAvatarAPI } from "./scripts/api.js";

// DOM узлы
const content = document.querySelector('.content');
const formList = Array.from(document.querySelectorAll('.form'));

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
const avatar = document.getElementById("avatar")
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

// ChangeAvatarPopup
const openChangeAvatarPopupButton = document.querySelector('.profile__image_change_button')
const changeAvatarPopup = document.querySelector('.popup_type_changeAvatar');
const closeChangeAvatarPopupButton = changeAvatarPopup.querySelector('.popup__close')

// Формы
const cardForm = document.forms.newPlace;
const link = cardForm.elements.link;
const title = cardForm.elements.placeName;
const avatarForm = document.forms.editAvatar;
const avatarLink = avatarForm.elements.avatarLink;
const nicknameForm = document.forms.editProfile;
const name = nicknameForm.elements.name;
const description = nicknameForm.elements.description;

enableValidation(formList);

loadProfileAPI()
    .then((res) => {
        profileName.textContent = res.name
        profileDescription.textContent = res.about;
        avatar.style.backgroundImage = `url('${res.avatar}')`;
    })

    .catch((err) => {
        console.log(err);
    });

// Функция открытия изображения
function openImagePopup(evt) {
    const eventTarget = evt.target;
    openPopup(imagePopup);
    popupImage.src = eventTarget.src;
    imagePopupTitle.textContent = eventTarget.alt;
    popupImage.alt = eventTarget.alt;
}

imagePopupCloseButton.addEventListener('click', function () {
    closePopup(imagePopup);
});

// Функция изменения профиля
openChangeAvatarPopupButton.addEventListener('click', function () {
    openPopup(changeAvatarPopup);
    clearValidation(avatarForm);
    avatarLink.value = '';
});

closeChangeAvatarPopupButton.addEventListener('click', function () {
    closePopup(changeAvatarPopup);
});

function updateAvatar(newAvatar) {
    avatar.style.backgroundImage = `url('${newAvatar}')`;
    changeAvatarAPI(newAvatar);
    return profile;
};

avatarForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    evt.target.textContent = 'Сохранение...';
    closePopup(changeAvatarPopup);
    clearValidation(avatarForm);
    updateAvatar(avatarLink.value);
    avatarForm.reset();
})

openChangeProfilePopupButton.addEventListener('click', function () {
    openPopup(changeProfilePopup);
    clearValidation(nicknameForm);
    name.value = profileName.textContent;
    description.value = profileDescription.textContent;
});

closeChangeProfilePopupButton.addEventListener('click', function () {
    closePopup(changeProfilePopup);
})

function changeName(nameValue, descriptionValue) {
    profileName.textContent = nameValue;
    profileDescription.textContent = descriptionValue;
    changeProfileAPI(nameValue, descriptionValue);
    return profile;
}

nicknameForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    evt.target.textContent = 'Сохранение...';
    clearValidation(nicknameForm);
    closePopup(changeProfilePopup);
    changeName(name.value, description.value)
    nicknameForm.reset();
});

// Открытие и закрытие addCardPopup
openAddCardPopupButton.addEventListener('click', function () {
    openPopup(addCardPopup);
    clearValidation(cardForm);
    link.value = '';
    title.value = '';
});

closeAddPopupButton.addEventListener('click', function () {
    closePopup(addCardPopup);
});

// Вывести встроеные карточки на страницу
loadCardsAPI()
    .then((data) => {
        data.forEach(function (element) {
            places.prepend(createCard(element.link, element.name, openImagePopup, deleteCard));
            console.log(element);
            document.querySelector('.like__count').textContent = element.likes.length;
            if (element.likes.some((like) => like._id === myID)){
                document.querySelector('.card__like-button').classList.add('card__like-button_is-active');
            };
        })
    })
    .catch((err) => {
        console.log(err);
    })

// Вывести карточку на страницу
cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    evt.target.textContent = 'Сохранение...';
    clearValidation(cardForm);
    closePopup(addCardPopup);
    places.prepend(createCard(link.value, title.value, openImagePopup, deleteCard))
    cardForm.reset();
});