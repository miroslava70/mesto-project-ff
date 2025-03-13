// @todo: DOM узлы
const content = document.querySelector('.content');
const places = content.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(linkValue, nameValue, altValue) {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const cardName = card.querySelector('.card__title');

    cardImage.src = linkValue;
    cardName.textContent = nameValue;
    cardImage.alt = altValue;

    deleteButton.addEventListener('click', function () {
        deleteCard(card);
    });

    likeButton.addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('card__like-button_is-active');
    });

    return card;

};

// @todo: Функция удаления карточки
function deleteCard(item) {
    item.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    places.append(addCard(element.link, element.name, element.alt));
});