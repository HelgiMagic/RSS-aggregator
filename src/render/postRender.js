const renderPosts = (posts, i18) => posts.map(({ url, title }) => {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.classList.add('fw-bold');
  a.textContent = title;

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
});

export default renderPosts;
