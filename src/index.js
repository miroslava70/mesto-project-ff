// Импорты
import './blocks/styles.css';
import { openPopup, closePopup } from "./scripts/modal.js";
import { createCard, deleteCard } from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { loadProfileAPI, loadCardsAPI, loadCardDataAPI, changeProfileAPI, changeAvatarAPI } from "./scripts/api.js";
import { catchErrors } from './utils/catchErrors.js';

let myID;

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

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorSelector: 'popup__input_validationError',
    submitButtonSelector: '.popup__button',
    buttonDisabledSelector: 'popup__button_disabled'
};

// Формы
const cardForm = document.forms.newPlace;
const link = cardForm.elements.link;
const title = cardForm.elements.placeName;
const avatarForm = document.forms.editAvatar;
const avatarLink = avatarForm.elements.avatarLink;
const nicknameForm = document.forms.editProfile;
const name = nicknameForm.elements.name;
const description = nicknameForm.elements.description;

enableValidation(settings);

Promise.all([loadProfileAPI(), loadCardsAPI()])
    .then(([profileInfo, cards]) => {
        myID = profileInfo._id
        profileName.textContent = profileInfo.name
        profileDescription.textContent = profileInfo.about;
        avatar.style.backgroundImage = `url('${profileInfo.avatar}')`;
        cards.forEach(function (element) {
            places.prepend(createCard(element.link, element.name, openImagePopup, deleteCard, {
                cardId: element._id,
                cardLikes: element.likes,
                ownerId: element.owner._id
            }, myID));
        })
    })
    .catch(catchErrors);

function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText;
    } else {
        button.textContent = buttonText;
    }
}

function submit(evt, loadingText = 'Сохранение...') {
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText)
}

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
    clearValidation(avatarForm, settings);
    avatarLink.value = '';
});

closeChangeAvatarPopupButton.addEventListener('click', function () {
    closePopup(changeAvatarPopup);
});

function updateAvatar(newAvatar, evt) {
    submit(evt);
    changeAvatarAPI(newAvatar)
        .then(() => {
            avatar.style.backgroundImage = `url('${newAvatar}')`;
            closePopup(changeAvatarPopup);
            avatarForm.reset();
        })
        .catch(catchErrors)

        .finally(() => {
            renderLoading(false, evt.submitter, 'Сохранить')
        })
    return profile;
};

avatarForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    updateAvatar(avatarLink.value, evt)
})

openChangeProfilePopupButton.addEventListener('click', function () {
    openPopup(changeProfilePopup);
    clearValidation(nicknameForm, settings);
    name.value = profileName.textContent;
    description.value = profileDescription.textContent;
});

closeChangeProfilePopupButton.addEventListener('click', function () {
    closePopup(changeProfilePopup);
})

function changeName(nameValue, descriptionValue, evt) {
    submit(evt);
    changeProfileAPI(nameValue, descriptionValue)
        .then(() => {
            profileName.textContent = nameValue;
            profileDescription.textContent = descriptionValue;
            closePopup(changeProfilePopup);
            nicknameForm.reset();
        })
        .catch(catchErrors)
        .finally(() => {
            renderLoading(false, evt.submitter, 'Сохранить')
        })
    return profile;
}

nicknameForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    changeName(name.value, description.value, evt)
});

// Открытие и закрытие addCardPopup
openAddCardPopupButton.addEventListener('click', function () {
    openPopup(addCardPopup);
    clearValidation(cardForm, settings);
    cardForm.reset();
});

closeAddPopupButton.addEventListener('click', function () {
    closePopup(addCardPopup);
});

// Вывести карточку на страницу
cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    submit(evt);
    loadCardDataAPI(title.value, link.value)
        .then((card) => {
            closePopup(addCardPopup);
            cardForm.reset();
            places.prepend(createCard(card.link, card.name, openImagePopup, deleteCard, {
                cardId: card._id,
                cardLikes: card.likes,
                ownerId: card.owner._id
            }, myID))
        })
        .catch(catchErrors)
        .finally(() => {
            renderLoading(false, evt.submitter, 'Сохранить')
        })
});