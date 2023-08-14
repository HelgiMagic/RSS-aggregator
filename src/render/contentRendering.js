const renderNewPosts = (elements, posts) => {
  posts.reverse().forEach(({ element }) => {
    elements.postsUL.prepend(element);
  });
};

const renderNewFeed = (elements, feed) => {
  elements.feedsUL.prepend(feed);
};

export { renderNewPosts, renderNewFeed };
