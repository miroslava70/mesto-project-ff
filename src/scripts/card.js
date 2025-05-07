import { deleteCardAPI, APILike, APIUnlike } from "./api";

import { catchErrors } from "../utils/catchErrors";
// Функция создания карточки
function createCard(linkValue, nameValue, openImageFunction, deleteCardFunction, cardInfo, userId) {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const cardName = card.querySelector('.card__title');
    const likeCount = card.querySelector('.like__count');

    cardImage.src = linkValue;
    cardName.textContent = nameValue;
    cardImage.alt = nameValue;
    likeCount.textContent = cardInfo.cardLikes.length;
    if (cardInfo.cardLikes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    };

    cardImage.addEventListener('click', openImageFunction);
    deleteButton.addEventListener('click', function (evt) {
        deleteCardFunction(evt.target, cardInfo.cardId);
    });

    likeButton.addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        likeCard(cardInfo.cardId, eventTarget, likeCount)
    });

    return card;
};

// Функция удаления карточки
function deleteCard(item, cardId) {
    deleteCardAPI(cardId)
        .then(() => {
            const card = item.closest('.card')
            card.remove();
        })
        .catch(catchErrors);
}

// Функция лайка карточки
function likeCard(cardId, likeButton, likeCount) {

    if (!likeButton.classList.contains('card__like-button_is-active')) {
        APILike(cardId)
            .then((likedCard) => {
                likeButton.classList.add('card__like-button_is-active');
                likeCount.textContent = likedCard.likes.length;
            })

            .catch(catchErrors)

    } else if (likeButton.classList.contains('card__like-button_is-active')) {
        APIUnlike(cardId)
            .then((likedCard) => {
                likeButton.classList.remove('card__like-button_is-active');
                likeCount.textContent = likedCard.likes.length;
            })

            .catch(catchErrors);
    }
}

export { createCard, deleteCard, likeCard };