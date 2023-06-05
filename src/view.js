import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import validate from './validate.js';
import resources from './locales/locales.js';
import renderForm from './formRendering.js';
import parseRSS from './parser.js';
import { renderNewPosts, renderNewFeed } from './contentRendering.js';
import checkNewPosts from './checkNewPosts.js';

const state = {
  lang: 'ru',
  form: {
    state: 'calm',
    error: '',
  },
  subscriptions: [],
  posts: [],
  feeds: [],
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
    // disable button
    const inputValue = document.querySelector('input').value.trim();
    validate(inputValue, state).then((answer) => {
      if (typeof answer === 'string') {
        axios
          .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(inputValue)}`)
          .then((response) => {
            try {
              const { posts, feed } = parseRSS(response.data.contents);
              watchedState.posts.push(posts);
              watchedState.feeds.push(feed);
              state.subscriptions.unshift({ url: inputValue, length: posts.length });
            } catch (e) {
              state.form.error = e.message;
              watchedState.form.state = 'invalid';
            }
          });
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

  if (path === 'posts') {
    renderNewPosts(state);
  }

  if (path === 'feeds') {
    renderNewFeed(state);
  }
});

const interval = setInterval(() => {
  try {
    console.log('rabotaet');
    checkNewPosts(watchedState);
  } catch (e) {
    clearInterval(interval);
  }
}, 5000);

export default watchedState;
