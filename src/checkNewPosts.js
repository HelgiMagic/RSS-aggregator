import axios from 'axios';
import parseRSS from './parser';

const checkNewPosts = (watchedState) => {
  watchedState.subscriptions.forEach((sub) => {
    axios
      .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(sub.url)}`)
      .then((response) => {
        const { posts } = parseRSS(response.data.contents);
        if (posts.length > sub.length) {
          const newPosts = posts.slice(sub.length);
          watchedState.posts.push(newPosts);
          sub.length = posts.length;
        }
      });
  });
};

export default checkNewPosts;

/*
мы всем элементам даём свойство url и (element)
потом получаем только те значения которых нет в изначальной версии массива
*/
