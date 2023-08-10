import axios from 'axios';
import parseRSS from './parser';
import getUrl from './getAxios.js';

const checkNewPosts = (watchedState) => {
  const subs = watchedState.feeds.map((feed) => feed.feedUrl);
  const responses = subs.map((sub) => axios
    .get(getUrl(sub))
    .then((response) => {
      const { posts } = parseRSS(response.data.contents);
      const oldUrls = watchedState.posts.flat().map((post) => post.url);

      const newPosts = posts.filter(({ url }) => !oldUrls.includes(url));
      watchedState.posts.push(newPosts);
    })
    .catch((e) => console.log(e)));

  Promise.allSettled(responses);

  setTimeout(() => {
    try {
      checkNewPosts(watchedState);
    } catch (e) { console.log('ошибка в обновлении ленты'); }
  }, 5000);
};

export default checkNewPosts;

/*
мы всем элементам даём свойство url и (element)
потом получаем только те значения которых нет в изначальной версии массива
*/
