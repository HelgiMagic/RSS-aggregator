const parseRSS = (content, feedUrl) => {
  const html = new DOMParser().parseFromString(content, 'text/xml');
  const rss = html.querySelector('rss');
  if (!rss) throw new Error('RSSNotFound');

  const feedTitle = rss.querySelector('title').textContent;
  const feedDescription = rss.querySelector('description').textContent;

  const feed = { title: feedTitle, description: feedDescription, feedUrl };

  const unparsedPosts = [...rss.querySelectorAll('item')];
  const posts = unparsedPosts.map((post) => {
    const title = post.querySelector('title').textContent;
    const description = post.querySelector('description').textContent;
    const url = post.querySelector('link').textContent;

    return { url, title, description };
  });
  return { posts, feed };
};

export default parseRSS;
