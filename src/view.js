/* eslint-disable no-param-reassign */
import onChange from 'on-change';
import i18next from 'i18next';
import { setLocale } from 'yup';
import validate from './validate.js';
import resources from './locales/locales.js';

const state = {
  lang: 'ru',
  form: {
    state: 'calm',
    error: '',
  },
  subscriptions: [],
};

const i18 = i18next.createInstance();
i18.init({
  lng: state.lang,
  debug: true,
  resources,
});

setLocale({
  string: {
    url: 'notAUrl',
    required: 'required',
    notOneOf: 'alreadySubscribed',
  },
});

const createBasedForm = (form) => {
  form.innerHTML = '';

  const input = document.createElement('input');
  input.name = 'url';
  input.id = 'url-input';

  const label = document.createElement('label');
  label.setAttribute('for', 'url-input');
  label.textContent = i18.t('rssLink');

  const button = document.createElement('button');
  button.type = 'submit';
  button.classList.add('btn', 'btn-primary');
  button.textContent = i18.t('submitButton');

  form.append(input, label, button);
  form.reset();
  input.focus();
  return { input, label, button };
};

const renderForm = (form, formState, inputValue) => {
  const warningMessage = document.querySelector('.warning');

  if (formState.state === 'calm') {
    createBasedForm(form);
    warningMessage.textContent = '';
  }

  if (formState.state === 'invalid') {
    const { input } = createBasedForm(form);
    input.classList.add('is-invalid');
    input.value = inputValue;

    warningMessage.textContent = i18.t(state.form.error);
  }
};

const form = document.querySelector('.rss-form');
renderForm(form, state.form);

const watchedState = onChange(state, (path, value) => {
  if (path === 'form.state' && value === 'sending') {
    const { value: inputValue } = document.querySelector('input');
    validate(inputValue, state).then((answer) => {
      if (typeof answer === 'string') {
        state.subscriptions.push(inputValue);
        watchedState.form.state = 'calm';
      } else {
        state.form.error = answer.message;
        watchedState.form.state = 'invalid';
      }
    });
  }

  if (path === 'form.state' && value === 'invalid') {
    const { value: inputValue } = document.querySelector('input');
    renderForm(form, state.form, inputValue);
  }

  if (path === 'form.state' && value === 'calm') {
    renderForm(form, state.form);
  }
});

export default watchedState;
