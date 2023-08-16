import '../public/style.scss';
import 'bootstrap';
import axios, { isAxiosError } from 'axios';
import i18next from 'i18next';
import { setLocale } from 'yup';
import validate from './validate.js';
import parseRSS from './parser';
import resources from './locales/locales.js';
import checkNewPosts from './checkNewPosts.js';
import translateStatic from './translateStaticLines';
import getUrl from './getUrl.js';
import createWatchedState from './view';

export const i18 = i18next.createInstance();

const runApp = () => {
  const state = {
    lang: 'ru',
    form: {
      status: 'calm',
      error: null,
    },
    posts: [],
    feeds: [],
    modal: {
      title: null, description: null, link: null,
    },
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    formInput: document.querySelector('.rss-form input'),
    formButton: document.querySelector('.rss-form button'),
    modal: document.getElementById('modal'),
    modalTitle: document.querySelector('.modal-title'),
    modalDescription: document.querySelector('.modal-body p'),
    modalButton: document.querySelector('.full-article'),
    feedsUL: document.querySelector('.feeds ul'),
    postsContainer: document.querySelector('.posts'),
    postsUL: document.querySelector('.posts ul'),
    warningMessage: document.querySelector('.warning'),
  };

  setLocale({
    string: {
      url: 'notAUrl',
    },
    mixed: {
      notOneOf: 'alreadySubscribed',
    },
  });

  i18.init({
    lng: state.lang,
    debug: true,
    resources,
  }).then(() => {
    const watchedState = createWatchedState(elements, state, i18);

    checkNewPosts(watchedState);

    translateStatic(document, i18);

    elements.postsContainer.addEventListener('click', (e) => {
      const { tagName } = e.target;
      if (tagName === 'A') {
        const aUrl = e.target.href;
        const post = watchedState.posts.find(({ url }) => url === aUrl);
        post.watched = true;
      }

      if (tagName === 'BUTTON') {
        const parent = e.target.parentElement;
        const a = parent.querySelector('a');

        const aUrl = a.href;
        const post = watchedState.posts.find(({ url }) => url === aUrl);
        post.watched = true;

        const { url, title, description } = post;
        watchedState.modal = { title, description, url };
      }
    });

    elements.form.addEventListener('submit', (e) => {
      e.preventDefault();
      watchedState.form.status = 'sending';

      const formData = new FormData(e.target);
      const inputValue = formData.get('url').trim();

      validate(inputValue, state)
        .then(() => axios.get(getUrl(inputValue)))
        .then((response) => {
          const { posts, feed } = parseRSS(response.data.contents);
          feed.feedUrl = inputValue;

          posts.reverse();
          watchedState.posts.push(...posts);
          watchedState.feeds.push(feed);

          watchedState.form.error = 'successfullyUploaded';
          watchedState.form.status = 'success';
        })
        .catch((err) => {
          if (isAxiosError(err)) watchedState.form.error = 'networkError';
          if (err.isParseError) watchedState.form.error = err.message;
          if (err.name === 'ValidationError') watchedState.form.error = err.message;
          else watchedState.form.error = 'somethingWrong';

          watchedState.form.status = 'invalid';
        });
    });
  });
};
export default runApp;
