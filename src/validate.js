import {
  string, setLocale,
} from 'yup';

const validate = (url, globalState) => {
  const subs = globalState.feeds.map((feed) => feed.feedUrl);
  const schema = string()
    .url().required('required')
    .notOneOf(subs);
  return schema.validate(url).catch((e) => e);
};

setLocale({
  string: {
    url: 'notAUrl',
  },
  mixed: {
    notOneOf: 'alreadySubscribed',
  },
});

export default validate;
