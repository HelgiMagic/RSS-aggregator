const parseRSS = (content) => {
  const html = new DOMParser().parseFromString(content, 'text/xml');
  const rss = html.querySelector('rss');
  if (!rss) throw new Error('RSSNotFound');

  const feedTitle = rss.querySelector('title').textContent;
  const feedDescription = rss.querySelector('description').textContent;

  const h6 = document.createElement('h6');
  const p = document.createElement('p');
  p.classList.add('small');
  h6.textContent = feedTitle;
  p.textContent = feedDescription;
  const feed = document.createElement('li');
  feed.append(h6, p);

  const unparsedPosts = [...rss.querySelectorAll('item')];
  const posts = unparsedPosts.map((item) => {
    const postTitle = item.querySelector('title').textContent;
    // сonst postDescription = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.classList.add('fw-bold');
    a.textContent = postTitle;

    const button = document.createElement('button');
    button.textContent = 'Просмотр';
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');

    const li = document.createElement('li');
    li.classList.add('post', 'd-flex', 'justify-content-between');
    li.append(a, button);
    return { url: link, element: li };
  });
  return { posts, feed };
};

export default parseRSS;
