import '../public/style.scss';
import watchedState from './view.js';

const form = document.querySelector('.rss-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  watchedState.form.state = 'sending';
});
