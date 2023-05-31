import onChange from 'on-change';
import {
    object, string, number, date, InferType,
} from 'yup';

const state = {
  form: {
    state: 'calm',
    error: '',
  },
  subscriptions: [],
};

const form = document.querySelector('.rss-form');
const input = form.querySelector('input');

const validate = (url) => {
  const schema = string()
    .url().required('string must be URL')
    .notOneOf(state.subscriptions);
  return schema.validate(url).catch((e) => e);
};

const watchedState = onChange(state, (path, value) => {
  if (path === 'form.state' && value === 'sending') {
    validate(input.value).then((answer) => {
      if (typeof answer === 'string') {
        state.subscriptions.push(input.value);
        watchedState.form.state = 'calm';
      } else {
        state.form.error = answer.message;
        watchedState.form.state = 'invalid';
      }
    });
  }

  if (path === 'form.state' && value === 'invalid') {
    input.classList.add('is-invalid');
    const warningMessage = document.querySelector('.warning') || document.createElement('p');
    warningMessage.classList.add('warning');
    warningMessage.textContent = state.form.error;
    form.append(warningMessage);
  }

  if (path === 'form.state' && value === 'calm') {
    input.classList.remove('is-invalid');
    const warningMessage = document.querySelector('.warning');
    warningMessage.remove();
    form.reset();
    input.focus();
  }
});

export default watchedState;
