import onChange from 'on-change';
import { state, i18 } from './init.js';
import renderForm from './formRendering.js';
import { renderNewPosts, renderNewFeed } from './contentRendering.js';
import parsePosts from './parsers/postParser.js';
import parseFeed from './parsers/feedParser.js';
import changeModalContent from './changeModal.js';

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
    const htmlPosts = state.posts.map((posts) => parsePosts(posts));
    renderNewPosts(htmlPosts);
  }

  if (path === 'feeds') {
    if (state.feeds.length === 1) {
      document.querySelector('.feeds').classList.remove('invisible');
      document.querySelector('.posts').classList.remove('invisible');
    }

    const htmlFeeds = state.feeds.map((feed) => parseFeed(feed));
    renderNewFeed(htmlFeeds);
  }

  if (path === 'watchedPosts') {
    const newWatch = state.watchedPosts.at(-1);
    const a = document.querySelector(`a[href="${newWatch}"`);
    a.className = 'fw-normal';
  }

  if (path === 'modal') {
    const { title, description, url } = state.modal;
    changeModalContent(title, description, url);
  }
});

export default watchedState;
