const getUrl = (url) => {
  const allorigins = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);

  return allorigins;
};

export default getUrl;
