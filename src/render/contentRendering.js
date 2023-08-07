const renderNewPosts = (elements, posts) => {
  posts.at(-1).reverse().forEach(({ element }) => {
    elements.postsUL.prepend(element);
  });
};

const renderNewFeed = (elements, feeds) => {
  elements.feedsUL.prepend(feeds.at(-1));
};

export { renderNewPosts, renderNewFeed };
