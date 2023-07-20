const translateStatic = (html, i18) => {
  const h1 = html.querySelector('h1');
  h1.textContent = i18.t('h1');

  const h3 = html.querySelector('h3');
  h3.textContent = i18.t('h3');

  const example = html.querySelector('p.mt-2');
  example.textContent = i18.t('example');

  const label = html.querySelector('label');
  label.textContent = i18.t('rssLink');

  const content = document.querySelector('.content');
  const posts = content.querySelector('.posts');
  const feeds = content.querySelector('.feeds');

  const postH2 = posts.querySelector('h2');
  const feedH2 = feeds.querySelector('h2');
  postH2.textContent = i18.t('posts');
  feedH2.textContent = i18.t('feeds');
};

export default translateStatic;
