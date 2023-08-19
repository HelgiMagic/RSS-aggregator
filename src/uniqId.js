const getRandomNumber = (maxI, minI = 0) => Math.floor(Math.random() * ((maxI + 1) - minI) + minI);
// maxI, minI = max number included, min number included

const getUniqId = (idList) => {
  const id = getRandomNumber(10000);
  if (idList.includes(id)) return getUniqId(idList);

  return id;
};

export default getUniqId;
