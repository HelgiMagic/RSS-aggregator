import {
  object, string, number, date, InferType,
} from 'yup';

const validate = (url, globalState) => {
  const schema = string()
    .url().required('string must be URL')
    .notOneOf(globalState.subscriptions);
  return schema.validate(url).catch((e) => e);
};

export default validate;
