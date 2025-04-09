const arkhyz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinskArea = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const kholmogorskDistrict = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

const initialCards = [
  {
    title: "Архыз",
    link: arkhyz,
  },
  {
    title: "Челябинская область",
    link: chelyabinskArea,
  },
  {
    title: "Иваново",
    link: ivanovo,
  },
  {
    title: "Камчатка",
    link: kamchatka,
  },
  {
    title: "Холмогорский район",
    link: kholmogorskDistrict,
  },
  {
    title: "Байкал",
    link: baikal,
  }
];

export default initialCards;