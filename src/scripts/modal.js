import escPopup from "./closePopupWithKey";

function popupOpen(item) {
    item.classList.add('popup_is-opened');
    document.addEventListener('keydown', escPopup);
}

function popupClose(item, form) {
    item.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escPopup);
}

export { popupOpen, popupClose };

