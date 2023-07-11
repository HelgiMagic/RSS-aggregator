import axios from 'axios';
import parseRSS from './parser';
import parsePosts from './parsers/postParser.js';

const checkNewPosts = (state, watchedState) => {
  watchedState.subscriptions.forEach((sub) => {
    axios
      .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(sub)}`)
      .then((response) => {
        try {
          const { posts } = parseRSS(response.data.contents);
          const oldUrls = state.posts.flat().map((post) => post.url);
          const newPosts = posts.filter(({ url }) => !oldUrls.includes(url));
          const newHtmlPosts = parsePosts(newPosts);
          watchedState.posts.push(newHtmlPosts);
        } catch (err) { console.log(err); }
      });
  });
};

export default checkNewPosts;

/*
мы всем элементам даём свойство url и (element)
потом получаем только те значения которых нет в изначальной версии массива
*/
