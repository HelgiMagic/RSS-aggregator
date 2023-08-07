import {
  string,
} from 'yup';

const validate = (url, globalState) => {
  const subs = globalState.feeds.map((feed) => feed.feedUrl);
  const schema = string()
    .url().required('required')
    .notOneOf(subs);

  return schema.validate(url);
};

export default validate;
