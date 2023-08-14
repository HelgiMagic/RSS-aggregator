const parseRSS = (content) => {
  const html = new DOMParser().parseFromString(content, 'text/xml');

  const notFoundErr = new Error('RSSNotFound');
  notFoundErr.isParseError = true;

  const parseErr = new Error('RSSParseError');
  parseErr.isParseError = true;

  const rss = html.querySelector('rss');
  if (!rss) throw notFoundErr;

  const parseError = rss.querySelector('parsererror');
  if (parseError) throw parseErr;

  const feedTitle = rss.querySelector('title').textContent;
  const feedDescription = rss.querySelector('description').textContent;

  const feed = { title: feedTitle, description: feedDescription };

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
