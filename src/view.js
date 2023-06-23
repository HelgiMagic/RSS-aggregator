import onChange from 'on-change';
import i18next from 'i18next';
import resources from './locales/locales.js';
import renderForm from './formRendering.js';
import { renderNewPosts, renderNewFeed } from './contentRendering.js';
import checkNewPosts from './checkNewPosts.js';

export const state = {
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

export const watchedState = onChange(state, (path, value) => {
  if (path === 'form.state') {
    if (value === 'calm' || value === 'success') renderForm(form, state, i18);

    else {
      const { value: inputValue } = document.querySelector('input');
      renderForm(form, state, i18, inputValue);
    }
  }

  if (path === 'posts') {
    renderNewPosts(state);
  }

  if (path === 'feeds') {
    if (state.feeds.length === 1) {
      document.querySelector('.feeds').classList.remove('invisible');
      document.querySelector('.posts').classList.remove('invisible');
    }
    renderNewFeed(state);
  }
});

const interval = setInterval(() => {
  try {
    checkNewPosts(state, watchedState);
  } catch (e) {
    clearInterval(interval);
  }
}, 5000);
