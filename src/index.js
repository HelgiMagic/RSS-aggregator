import '../public/style.scss';
import 'bootstrap';
import axios from 'axios';
import { state, watchedState } from './view.js';
import validate from './validate.js';
import parseRSS from './parser';

const form = document.querySelector('.rss-form');

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
          watchedState.form.state = 'error';
        })
        .then((response) => {
          try {
            const { posts, feed } = parseRSS(response.data.contents);
            watchedState.posts.push(posts);
            watchedState.feeds.push(feed);

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
// запуск проверки
