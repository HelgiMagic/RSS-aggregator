const renderFeed = ({ title, description }) => {
  const h6 = document.createElement('h6');
  const p = document.createElement('p');
  p.classList.add('small');

  h6.textContent = title;
  p.textContent = description;

  const feed = document.createElement('li');
  feed.append(h6, p);

  return feed;
};

const renderPost = ({ url, title, id }, i18, watchedPostsIds) => {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.classList.add('fw-bold');
  a.textContent = title;
  if (watchedPostsIds.has(id)) a.className = 'fw-normal';

  const button = document.createElement('button');
  button.textContent = i18.t('view');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');

  const li = document.createElement('li');
  li.classList.add('post', 'd-flex', 'justify-content-between');
  li.append(a, button);

  return li;
};

const rerenderPosts = (elements, posts) => {
  elements.postsUL.innerHTML = '';

  posts.forEach((post) => {
    elements.postsUL.prepend(post);
  });
};

const renderNewFeed = (elements, feed) => {
  elements.feedsUL.prepend(feed);
};

export {
  renderPost, renderFeed, rerenderPosts, renderNewFeed,
};
