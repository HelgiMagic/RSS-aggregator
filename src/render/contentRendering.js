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

const renderPosts = ({ url, title, watched }, i18) => {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.classList.add('fw-bold');
  a.textContent = title;
  if (watched) a.className = 'fw-normal';

  const button = document.createElement('button');
  button.textContent = i18.t('view');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');

  const li = document.createElement('li');
  li.classList.add('post', 'd-flex', 'justify-content-between');
  li.append(a, button);

  return { url, element: li };
};

const rerenderPosts = (elements, posts) => {
  elements.postsUL.innerHTML = '';

  posts.forEach(({ element }) => {
    elements.postsUL.prepend(element);
  });
};

const renderNewFeed = (elements, feed) => {
  elements.feedsUL.prepend(feed);
};

export {
  renderPosts, renderFeed, rerenderPosts, renderNewFeed,
};
