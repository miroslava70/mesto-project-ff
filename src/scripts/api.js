import { checkResponce } from "../utils/checkResponce";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
    headers: {
        authorization: '8440a291-0f0b-4349-8150-1e5205f18db6',
        'Content-Type': 'application/json'
    }
}

export function loadProfileAPI() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(checkResponce);
};

export function changeProfileAPI(name, description) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
    .then(checkResponce);
};

export function loadCardsAPI() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(checkResponce);
};

export function loadCardDataAPI(title, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: title,
            link: link
        })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};

export function deleteCardAPI(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponce);
}


export function APILike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};

export function APIUnlike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponce);
};

export function changeAvatarAPI(newAvatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: newAvatar })
    })
    .then(checkResponce);
};