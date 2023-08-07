import onChange from 'on-change';
import renderForm from './render/formRendering.js';
import { renderNewPosts, renderNewFeed } from './render/contentRendering.js';
import renderPosts from './render/postRender.js';
import renderFeed from './render/feedRender.js';
import changeModalContent from './render/changeModal.js';

const form = document.querySelector('.rss-form');

const createWatchedState = (elements, state, i18) => onChange(state, (path, value) => {
  if (path === 'form.state') {
    if (value === 'calm' || value === 'success') renderForm(elements, form, state, i18);

    else {
      const { value: inputValue } = document.querySelector('input');
      renderForm(elements, form, state, i18, inputValue);
    }
  }

  if (path === 'posts') {
    const htmlPosts = state.posts.map((posts) => renderPosts(posts, i18));
    renderNewPosts(elements, htmlPosts);
  }

  if (path === 'feeds') {
    if (state.feeds.length === 1) {
      document.querySelector('.feeds').classList.remove('invisible');
      document.querySelector('.posts').classList.remove('invisible');
    }

    const htmlFeeds = state.feeds.map((feed) => renderFeed(feed));
    renderNewFeed(elements, htmlFeeds);
  }

  if (path === 'watchedPosts') {
    const newWatch = state.watchedPosts.at(-1);
    const a = document.querySelector(`a[href="${newWatch}"`);
    a.className = 'fw-normal';
  }

  if (path === 'modal') {
    const { title, description, url } = state.modal;
    changeModalContent(elements, title, description, url);
  }
});

export default createWatchedState;
