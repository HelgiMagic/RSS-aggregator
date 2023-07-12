const content = document.querySelector('.content');
const postsContainer = content.querySelector('.posts');
const feedsContainer = content.querySelector('.feeds');
const feedsUL = feedsContainer.querySelector('ul');
const postsUL = postsContainer.querySelector('ul');

const renderNewPosts = (posts) => {
  posts.at(-1).reverse().forEach(({ element }) => {
    postsUL.prepend(element);
  });
};

const renderNewFeed = (feeds) => {
  feedsUL.prepend(feeds.at(-1));
};

export { renderNewPosts, renderNewFeed };
