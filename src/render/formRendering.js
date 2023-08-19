const renderForm = (elements, globalState, i18, inputValue) => {
  if (globalState.form.status === 'calm') {
    elements.form.reset();
    elements.formInput.focus();

    elements.warningMessage.textContent = '';
  }

  if (globalState.form.status === 'success') {
    elements.form.reset();
    elements.formInput.focus();
    elements.formButton.removeAttribute('disabled');
    elements.formInput.classList.remove('is-invalid');

    elements.warningMessage.textContent = i18.t(globalState.form.message);
    elements.warningMessage.setAttribute('style', 'color: rgba(25,135,84)');
  } else elements.warningMessage.removeAttribute('style');

  if (globalState.form.status === 'invalid') {
    elements.form.reset();
    elements.formInput.focus();
    elements.formButton.removeAttribute('disabled');

    elements.formInput.classList.add('is-invalid');
    elements.formInput.value = inputValue;

    elements.warningMessage.textContent = i18.t(globalState.form.message);
  }

  if (globalState.form.status === 'sending') {
    elements.form.reset();
    elements.formInput.focus();

    elements.formInput.value = inputValue;
    elements.formInput.classList.remove('is-invalid');
    elements.formButton.setAttribute('disabled', '');
    elements.warningMessage.textContent = '';
  }
};

export default renderForm;
