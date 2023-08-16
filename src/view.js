import onChange from 'on-change';
import renderForm from './render/formRendering.js';
import {
  renderPosts, renderFeed, rerenderPosts, renderNewFeed,
} from './render/contentRendering.js';
import changeModalContent from './render/changeModal.js';

const createWatchedState = (elements, state, i18) => onChange(state, (path, value) => {
  if (path === 'form.status') {
    if (value === 'calm' || value === 'success') renderForm(elements, state, i18);

    else {
      const { value: inputValue } = document.querySelector('input');
      renderForm(elements, state, i18, inputValue);
    }
  }

  if (path === 'posts') {
    const htmlPosts = state.posts.map((post) => renderPosts(post, i18));
    rerenderPosts(elements, htmlPosts);
  }

  if (path.endsWith('.watched')) {
    const htmlPosts = state.posts.map((post) => renderPosts(post, i18));
    rerenderPosts(elements, htmlPosts);
  }

  if (path === 'feeds') {
    if (state.feeds.length === 1) {
      document.querySelector('.feeds').classList.remove('invisible');
      document.querySelector('.posts').classList.remove('invisible');
    }

    const htmlFeeds = renderFeed(state.feeds.at(-1));
    renderNewFeed(elements, htmlFeeds);
  }

  if (path === 'modal') {
    const { title, description, url } = state.modal;
    changeModalContent(elements, title, description, url);
  }
});

export default createWatchedState;
