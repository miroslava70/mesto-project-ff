import { popupClose, popupOpen } from "./modal";

const changeNameButton = document.querySelector('.profile__edit-button');
const namePopup = document.querySelector('.popup_type_edit');
const namePopupCloseButton = namePopup.querySelector('.popup__close');

const nicknameForm = document.forms.editProfile;
const name = nicknameForm.elements.name;
const description = nicknameForm.elements.description;

changeNameButton.addEventListener('click', function () {
    popupOpen(namePopup);
});

namePopupCloseButton.addEventListener('click', function () {
    popupClose(namePopup);
})

function changeName(nameValue, descriptionValue) {
    let profile = document.querySelector('.profile__info');
    const newProfile = profile.cloneNode(true);
    const profileName = newProfile.querySelector('.profile__title');
    const profileDescription = newProfile.querySelector('.profile__description');

    profileName.textContent = nameValue;
    profileDescription.textContent = descriptionValue;
    newProfile.querySelector('.profile__edit-button').addEventListener('click', function () {
        popupOpen(namePopup);
    });

    profile.replaceWith(newProfile);
    return profile;
}

nicknameForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    popupClose(namePopup);
    changeName(name.value, description.value);
    nicknameForm.reset();
});


export { changeNameButton, namePopup, nicknameForm, changeName };