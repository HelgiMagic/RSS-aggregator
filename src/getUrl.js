const getUrl = (url) => {
  const allorigins = new URL('https://allorigins.hexlet.app');

  allorigins.pathname = '/get';
  allorigins.searchParams.set('disableCache', 'true');
  allorigins.searchParams.set('url', url);

  return allorigins;
};

export default getUrl;
