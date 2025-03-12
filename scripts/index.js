// @todo: DOM узлы
const content = document.querySelector('.content');
const places = content.querySelector('.places__list')
const popupButton = content.querySelector('.profile__add-button');
const popup = document.querySelector('.popup_type_new-card');
const addButton = popup.querySelector('.popup__button');
const closePopup = popup.querySelector('.popup__close');

// @todo: Popup
popupButton.addEventListener('click', function () {
    popup.classList.add('popup_is-opened');
});

closePopup.addEventListener('click', function () {
    popup.classList.remove('popup_is-opened');
});

// @todo: Функция создания карточки
function addCard(linkValue, nameValue) {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');

    card.querySelector('.card__image').src = linkValue;
    card.querySelector('.card__title').textContent = nameValue;

    // @todo: Функция удаления карточки
    deleteButton.addEventListener('click', function () {
        card.remove();
    });

    likeButton.addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like-button_is-active');
    });

    places.append(card);
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    addCard(element.link, element.name);
});

addButton.addEventListener('click', function () {
    popup.classList.remove('popup_is-opened');

    const link = popup.querySelector('.popup__input_type_url');
    const name = popup.querySelector('.popup__input_type_card-name');
    addCard(link.value, name.value);

    link.value = '';
    name.value = '';
});
