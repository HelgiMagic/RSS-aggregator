import {
  string, setLocale,
} from 'yup';

const validate = (url, globalState) => {
  const schema = string()
    .url().required('required')
    .notOneOf(globalState.subscriptions);
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
