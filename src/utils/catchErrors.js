export function catchErrors(err) {
    return Promise.reject(`Ошибка: ${err.status}`);
}