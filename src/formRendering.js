/* eslint-disable no-param-reassign */
const createBasedForm = (form, i18) => {
  form.innerHTML = '';

  const input = document.createElement('input');
  input.name = 'url';
  input.id = 'url-input';

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

  if (globalState.form.state === 'invalid') {
    const { input } = createBasedForm(form, i18);
    input.classList.add('is-invalid');
    input.value = inputValue;

    warningMessage.textContent = i18.t(globalState.form.error);
    warningMessage.classList.remove('invisible');
  }
};

export default renderForm;
