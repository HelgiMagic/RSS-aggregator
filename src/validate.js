const validate = (url, feeds, baseSchema) => {
  const feedUrls = feeds.map((feed) => feed.feedUrl);
  const actualSchema = baseSchema.notOneOf(feedUrls);

  return actualSchema.validate(url);
};

export default validate;
