// Открытие и закрытие попапов
function openPopup(item) {
    item.classList.add('popup_is-opened');
    addExtraCloseMethods(item);
}

function closePopup(item) {
    item.classList.remove('popup_is-opened');
    deleteExtraCloseMethods(item);
}

// Дополнительные способы закрытия попапов
function closeWithEscKeyPopup(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

function closeWithMousePopup(evt) {
    if (evt.target === document.querySelector('.popup_is-opened')) {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

function addExtraCloseMethods(item) {
    document.addEventListener('keydown', closeWithEscKeyPopup);
    item.addEventListener('click', closeWithMousePopup);
}

function deleteExtraCloseMethods(item) {
    document.removeEventListener('keydown', closeWithEscKeyPopup);
    item.removeEventListener('click', closeWithMousePopup);
}

export { openPopup, closePopup };

