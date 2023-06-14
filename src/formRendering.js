const createBasedForm = (form, i18) => {
  form.innerHTML = '';

  const input = document.createElement('input');
  input.name = 'url';
  input.id = 'url-input';
  input.setAttribute('aria-label', 'url');

  const label = document.createElement('label');
  label.setAttribute('for', 'url-input');
  label.textContent = i18.t('rssLink');

  const button = document.createElement('button');
  button.type = 'submit';
  button.classList.add('btn', 'btn-primary', 'submit-button');
  button.textContent = i18.t('submitButton');

  form.append(input, label, button);
  form.reset();
  input.focus();
  return { input, label, button };
};

const renderForm = (form, globalState, i18, inputValue) => {
  const warningMessage = document.querySelector('.warning');

  if (globalState.form.state === 'calm') {
    createBasedForm(form, i18);
    warningMessage.classList.add('invisible');
    warningMessage.textContent = '.';
  }

  if (globalState.form.state === 'success') {
    createBasedForm(form, i18);
    warningMessage.classList.remove('invisible');
    warningMessage.textContent = i18.t(globalState.form.error);
    console.log(globalState.form.error);
    warningMessage.setAttribute('style', 'color: green');
  } else warningMessage.removeAttribute('style');

  if (globalState.form.state === 'invalid') {
    const { input } = createBasedForm(form, i18);
    input.classList.add('is-invalid');
    input.value = inputValue;

    warningMessage.textContent = i18.t(globalState.form.error);
    warningMessage.classList.remove('invisible');
  }

  if (globalState.form.state === 'sending') {
    const { button, input } = createBasedForm(form, i18);
    input.value = inputValue;
    button.setAttribute('disabled', '');
    warningMessage.classList.add('invisible');
    warningMessage.textContent = '.';
  }
};

export default renderForm;
