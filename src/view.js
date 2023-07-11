import onChange from 'on-change';
import { state, i18 } from './init.js';
import renderForm from './formRendering.js';
import { renderNewPosts, renderNewFeed } from './contentRendering.js';

const form = document.querySelector('.rss-form');

const watchedState = onChange(state, (path, value) => {
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

export default watchedState;
