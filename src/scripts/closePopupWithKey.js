import { popupClose } from "./modal";

function escPopup(evt) {
    if (evt.key === 'Escape') {
        popupClose(document.querySelector('.popup_is-opened'));
    }
}

export default escPopup;