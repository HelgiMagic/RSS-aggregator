const renderForm = (elements, form, globalState, i18, inputValue) => {
  if (globalState.form.state === 'calm') {
    form.reset();
    elements.formInput.focus();

    elements.warningMessage.classList.add('invisible');
    elements.warningMessage.textContent = '.';
  }

  if (globalState.form.state === 'success') {
    form.reset();
    elements.formInput.focus();
    elements.formButton.removeAttribute('disabled');
    elements.formInput.classList.remove('is-invalid');

    elements.warningMessage.classList.remove('invisible');
    elements.warningMessage.textContent = i18.t(globalState.form.error);
    console.log(globalState.form.error);
    elements.warningMessage.setAttribute('style', 'color: green');
  } else elements.warningMessage.removeAttribute('style');

  if (globalState.form.state === 'invalid') {
    form.reset();
    elements.formInput.focus();
    elements.formButton.removeAttribute('disabled');

    elements.formInput.classList.add('is-invalid');
    elements.formInput.value = inputValue;

    elements.warningMessage.textContent = i18.t(globalState.form.error);
    elements.warningMessage.classList.remove('invisible');
  }

  if (globalState.form.state === 'sending') {
    form.reset();
    elements.formInput.focus();

    elements.formInput.value = inputValue;
    elements.formInput.classList.remove('is-invalid');
    elements.formButton.setAttribute('disabled', '');
    elements.warningMessage.classList.add('invisible');
    elements.warningMessage.textContent = '.';
  }
};

export default renderForm;
