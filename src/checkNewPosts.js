import axios from 'axios';
import parseRSS from './parser';
import getUrl from './getUrl.js';

const checkNewPosts = (watchedState) => {
  const subs = watchedState.feeds.map((feed) => feed.feedUrl);
  const responses = subs.map((sub) => axios
    .get(getUrl(sub))
    .then((response) => {
      const { posts } = parseRSS(response.data.contents);
      const oldUrls = watchedState.posts.map((post) => post.url);

      const newPosts = posts.filter(({ url }) => !oldUrls.includes(url));
      newPosts.reverse();
      watchedState.posts.push(...newPosts);
    })
    .catch((e) => console.log(e)));

  Promise.allSettled(responses)
    .finally(() => setTimeout(() => {
      checkNewPosts(watchedState);
    }, 5000));
};

export default checkNewPosts;
