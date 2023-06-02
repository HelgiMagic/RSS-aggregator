import {
  object, string, number, date, InferType,
} from 'yup';

const validate = (url, globalState, i18) => {
  const schema = string()
    .url().required(i18.t('required'))
    .notOneOf(globalState.subscriptions);
  return schema.validate(url).catch((e) => e);
};

export default validate;
