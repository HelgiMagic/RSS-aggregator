/* eslint-disable no-param-reassign */
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import validate from './validate.js';
import resources from './locales/locales.js';
import renderForm from './formRendering.js';

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

const form = document.querySelector('.rss-form');
renderForm(form, state, i18);

const watchedState = onChange(state, (path, value) => {
  if (path === 'form.state' && value === 'sending') {
    const inputValue = document.querySelector('input').value.trim();
    validate(inputValue, state).then((answer) => {
      if (typeof answer === 'string') {
        state.subscriptions.push(inputValue);
        axios.get(inputValue).then((response) => console.log(response)).catch(console.log);
        watchedState.form.state = 'calm';
      } else {
        state.form.error = answer.message;
        watchedState.form.state = 'invalid';
      }
    });
  }

  if (path === 'form.state' && value === 'invalid') {
    const { value: inputValue } = document.querySelector('input');
    renderForm(form, state, i18, inputValue);
  }

  if (path === 'form.state' && value === 'calm') {
    renderForm(form, state, i18);
  }
});

export default watchedState;
