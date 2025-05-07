function disableButton(buttonElement, buttonDisabledSelector) {
    buttonElement.disabled = true;
    buttonElement.classList.add(buttonDisabledSelector);
}

function undisableButton(buttonElement, buttonDisabledSelector) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(buttonDisabledSelector);
}

function customPatternValidationCheck(input) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage)
    } else {
        input.setCustomValidity("")
    }
}

function addValidationErrorClass(input, inputErrorSelector, errorText, buttonElement, buttonDisabledSelector) {
    disableButton(buttonElement, buttonDisabledSelector)
    input.classList.add(inputErrorSelector);
    errorText.textContent = input.validationMessage;
}

function removeValidationErrorClass(input, inputErrorSelector, errorText, buttonElement, buttonDisabledSelector) {
    undisableButton(buttonElement, buttonDisabledSelector)
    input.classList.remove(inputErrorSelector);
    errorText.textContent = '';
}

function checkValidation(input, inputErrorSelector, button, errorText, buttonDisabledSelector) {
    customPatternValidationCheck(input)
    if (!input.validity.valid) {
        addValidationErrorClass(input, inputErrorSelector, errorText, button, buttonDisabledSelector)
    } else {
        removeValidationErrorClass(input, inputErrorSelector, errorText, button, buttonDisabledSelector)
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
                checkValidation(input, settings.inputErrorSelector, button, errorText, settings.buttonDisabledSelector);
            })
        })
    })
};

function clearValidation(form, settings) {
    const inputList = form.querySelectorAll(settings.inputSelector);
    const button = form.querySelector(settings.submitButtonSelector)
    inputList.forEach(function (input) {
        const errorText = form.querySelector(`.${input.id}__error_text`);
        removeValidationErrorClass(input, settings.inputErrorSelector, errorText, button, settings.buttonDisabledSelector);
        disableButton(button, settings.buttonDisabledSelector);
    })
}
export { enableValidation, clearValidation };