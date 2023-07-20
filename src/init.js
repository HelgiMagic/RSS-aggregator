import '../public/style.scss';
import 'bootstrap';
import axios from 'axios';
import i18next from 'i18next';
import validate from './validate.js';
import parseRSS from './parser';
import resources from './locales/locales.js';
import checkNewPosts from './checkNewPosts.js';
import changeModalContent from './changeModal';
import translateStatic from './translateStaticLines';

export const state = {
  lang: 'ru',
  form: {
    state: 'calm',
    error: null,
  },
  posts: [],
  feeds: [],
};

export const i18 = i18next.createInstance();

const runApp = (watchedState) => {
  i18.init({
    lng: state.lang,
    debug: true,
    resources,
  }).then(() => {
    const interval = setInterval(() => {
      try {
        checkNewPosts(state, watchedState);
      } catch (e) {
        clearInterval(interval);
      }
    }, 5000);

    translateStatic(document, i18);
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

        const link = a.href;
        const post = state.posts.flat().find(({ url }) => url === link);
        const { url, title, description } = post;
        changeModalContent(title, description, url);
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
                const { posts, feed } = parseRSS(response.data.contents, inputValue);

                console.log(posts);

                watchedState.posts.push(posts);
                watchedState.feeds.push(feed);

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
  });
};

export default runApp;
