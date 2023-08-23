let id = 0;

const getUniqId = () => {
  id += 1;

  return id;
};

export default getUniqId;
