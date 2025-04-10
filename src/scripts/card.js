// Функция создания карточки
function createCard(linkValue, nameValue, openImageFunction, deleteCardFunction, likeCardFunction) {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const cardName = card.querySelector('.card__title');

    cardImage.src = linkValue;
    cardName.textContent = nameValue;

    cardImage.addEventListener('click', openImageFunction);
    deleteButton.addEventListener('click', deleteCardFunction);
    likeButton.addEventListener('click', likeCardFunction);

    return card;
};


// Функция удаления карточки
function deleteCard(evt) {
    const eventTarget = evt.target;
    const card = eventTarget.closest('.card')
    card.remove();
}

// Функция лайка карточки
function likeCard(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };