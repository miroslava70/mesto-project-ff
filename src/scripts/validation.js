function addValidationErrorClass(input, errorText, buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
    input.classList.add('popup__input_validationError');
    errorText.textContent = input.validationMessage;
}

function removeValidationErrorClass(input, errorText, buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
    input.classList.remove('popup__input_validationError');
    errorText.textContent = '';
}

function checkValidation(input, button, errorText) {
    if (!input.validity.valid) {
        addValidationErrorClass(input, errorText, button)
    } else {
        removeValidationErrorClass(input, errorText, button)
    }
}

function enableValidation(formList) {
    formList.forEach(function (formItem) {
        formItem.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const inputList = formItem.querySelectorAll('.popup__input');

        inputList.forEach(function (input) {
            input.addEventListener('input', function () {
                const button = formItem.querySelector('.popup__button')
                const errorText = formItem.querySelector(`.${input.id}__error_text`);
                checkValidation(input, button, errorText);
            })
        })
    })
};

function clearValidation(form) {
    const inputList = form.querySelectorAll('.popup__input');
    const button = form.querySelector('.popup__button')
    inputList.forEach(function (input) {
        const errorText = form.querySelector(`.${input.id}__error_text`);
        input.classList.remove('popup__input_validationError');
        errorText.textContent = '';
        button.disabled = true;
        button.classList.add('popup__button_disabled');
    })
}
export { enableValidation, clearValidation };