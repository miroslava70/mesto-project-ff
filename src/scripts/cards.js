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
    alt: "Горы со снегом. Ближняя гора - каменная, внизу - река и источник поближости, в далеке - гора с зеленью",
  },
  {
    title: "Челябинская область",
    link: chelyabinskArea,
    alt: "Заснеженный лес с широкой рекой",
  },
  {
    title: "Иваново",
    link: ivanovo,
    alt: "Серые многоэтажки в вечернее время",
  },
  {
    title: "Камчатка",
    link: kamchatka,
    alt: "Холм со зеленью и вулканом вдалеке",
  },
  {
    title: "Холмогорский район",
    link: kholmogorskDistrict,
    alt: "Железнная дорога в лесу",
  },
  {
    title: "Байкал",
    link: baikal,
    alt: "Берег с обрывом на озеро",
  }
];

export default initialCards;