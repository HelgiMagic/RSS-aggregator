import '../public/style.scss';
import 'bootstrap';
import axios from 'axios';
import i18next from 'i18next';
import validate from './validate.js';
import parseRSS from './parser';
import resources from './locales/locales.js';
import checkNewPosts from './checkNewPosts.js';
import parsePosts from './parsers/postParser.js';
import parseFeed from './parsers/feedParser';

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

export const i18 = i18next.createInstance();
i18.init({
  lng: state.lang,
  debug: true,
  resources,
});

const runApp = (watchedState) => {
  const interval = setInterval(() => {
    try {
      checkNewPosts(state, watchedState);
    } catch (e) {
      clearInterval(interval);
    }
  }, 5000);

  const form = document.querySelector('.rss-form');
  const postsC = document.querySelector('.posts');

  postsC.addEventListener('click', (e) => {
    const { tagName } = e.target;
    if (tagName === 'A') {
      e.target.className = 'fw-normal';
    }

    if (tagName === 'BUTTON') {
      const parent = e.target.parentElement;
      const a = parent.querySelector('a');
      a.className = 'fw-normal';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.form.state = 'sending';
    const inputValue = document.querySelector('input').value.trim();
    validate(inputValue, state).then((answer) => {
      if (typeof answer === 'string') {
        axios
          .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(inputValue)}`)
          .catch(() => {
            state.form.error = 'networkError';
            watchedState.form.state = 'invalid';
          })
          .then((response) => {
            try {
              const { posts, feed } = parseRSS(response.data.contents);

              const htmlPosts = parsePosts(posts);
              const htmlFeed = parseFeed(feed);
              watchedState.posts.push(htmlPosts);
              watchedState.feeds.push(htmlFeed);

              state.subscriptions.unshift(inputValue);
              state.form.error = 'successfullyUploaded';
              watchedState.form.state = 'success';
            } catch (err) {
              state.form.error = err.message;
              watchedState.form.state = 'invalid';
            }
          });
      } else {
        state.form.error = answer.message;
        watchedState.form.state = 'invalid';
      }
    });
  });
};

export default runApp;
