const renderForm = (form, globalState, i18, inputValue) => {
  const warningMessage = document.querySelector('.warning');
  const input = form.querySelector('input');
  const button = form.querySelector('button');

  if (globalState.form.state === 'calm') {
    form.reset();
    input.focus();

    warningMessage.classList.add('invisible');
    warningMessage.textContent = '.';
  }

  if (globalState.form.state === 'success') {
    form.reset();
    input.focus();
    button.removeAttribute('disabled');
    input.classList.remove('is-invalid');

    warningMessage.classList.remove('invisible');
    warningMessage.textContent = i18.t(globalState.form.error);
    console.log(globalState.form.error);
    warningMessage.setAttribute('style', 'color: green');
  } else warningMessage.removeAttribute('style');

  if (globalState.form.state === 'invalid') {
    form.reset();
    input.focus();
    button.removeAttribute('disabled');

    input.classList.add('is-invalid');
    input.value = inputValue;

    warningMessage.textContent = i18.t(globalState.form.error);
    warningMessage.classList.remove('invisible');
  }

  if (globalState.form.state === 'sending') {
    form.reset();
    input.focus();

    input.value = inputValue;
    button.setAttribute('disabled', '');
    warningMessage.classList.add('invisible');
    warningMessage.textContent = '.';
  }
};

export default renderForm;
