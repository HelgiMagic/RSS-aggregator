import axios from 'axios';
import parseRSS from './parser.js';

const renderContent = (content, globalState) => {
  const postsContainer = content.querySelector('.posts');
  const feedsContainer = content.querySelector('.feeds');

  const postsUL = postsContainer.querySelector('ul');
  const feedsUL = feedsContainer.querySelector('ul');

  const newPosts = document.createElement('ul');
  const newFeeds = document.createElement('ul');

  const { subscriptions } = globalState;
  subscriptions.forEach((sub) => {
    axios
      .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(sub)}`)
      .then((response) => {
        const { posts, feed } = parseRSS(response.data.contents);
        posts.forEach((post) => newPosts.append(post));
        newFeeds.append(feed);
      })
      .then(() => {
        postsUL.replaceWith(newPosts);
        feedsUL.replaceWith(newFeeds);
      });
  });
};

export default renderContent;
