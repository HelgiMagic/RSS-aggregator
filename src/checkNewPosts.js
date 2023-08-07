import axios from 'axios';
import parseRSS from './parser';
import getUrl from './getAxios.js';

const checkNewPosts = async (state, watchedState) => {
  const subs = state.feeds.map((feed) => feed.feedUrl);
  const responsesC = subs.map((sub) => axios.get(getUrl(sub)));

  const promise = Promise.all(responsesC);
  promise.then((responses) => responses.forEach((response) => {
    try {
      const { posts } = parseRSS(response.data.contents);
      const oldUrls = state.posts.flat().map((post) => post.url);

      const newPosts = posts.filter(({ url }) => !oldUrls.includes(url));
      watchedState.posts.push(newPosts);
    } catch (err) { console.log(err); }
  }));
};

export default checkNewPosts;

/*
мы всем элементам даём свойство url и (element)
потом получаем только те значения которых нет в изначальной версии массива
*/
