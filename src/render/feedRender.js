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

export default renderFeed;
