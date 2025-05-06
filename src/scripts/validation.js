function disableButton(buttonElement, buttonDisabledSelector) {
    buttonElement.disabled = true;
    buttonElement.classList.add(buttonDisabledSelector);
}

function undisableButton(buttonElement, buttonDisabledSelector) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(buttonDisabledSelector);
}

function customPatternValidationCheck(input){
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage)
    } else {
        input.setCustomValidity("")
    }
}

function addValidationErrorClass(input, errorText, buttonElement, buttonDisabledSelector) {
    disableButton(buttonElement, buttonDisabledSelector)
    input.classList.add('popup__input_validationError');
    errorText.textContent = input.validationMessage;
}

function removeValidationErrorClass(input, errorText, buttonElement, buttonDisabledSelector) {
    undisableButton(buttonElement, buttonDisabledSelector)
    input.classList.remove('popup__input_validationError');
    errorText.textContent = '';
}

function checkValidation(input, button, errorText, buttonDisabledSelector) {
    customPatternValidationCheck(input)
    if (!input.validity.valid) {
        addValidationErrorClass(input, errorText, button, buttonDisabledSelector)
    } else {
        removeValidationErrorClass(input, errorText, button, buttonDisabledSelector)
    }
}

function enableValidation(settings) {
    const formList = document.querySelectorAll(settings.formSelector)
    formList.forEach(function (formItem) {
        formItem.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const inputList = formItem.querySelectorAll(settings.inputSelector);

        inputList.forEach(function (input) {
            input.addEventListener('input', function () {
                const button = formItem.querySelector(settings.submitButtonSelector)
                const errorText = formItem.querySelector(`.${input.id}__error_text`);
                checkValidation(input, button, errorText, settings.buttonDisabledSelector);
            })
        })
    })
};

function clearValidation(form) {
    const inputList = form.querySelectorAll('.popup__input');
    const button = form.querySelector('.popup__button')
    inputList.forEach(function (input) {
        const errorText = form.querySelector(`.${input.id}__error_text`);
        removeValidationErrorClass(input, errorText, button);
        disableButton(button);
    })
}
export { enableValidation, clearValidation };