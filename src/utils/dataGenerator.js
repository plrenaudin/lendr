import db from "../stores/inventoryDb";

const nbUsers = 45;
const nbItems = 1000;
const nbLoans = 10000;
const generateWord = nb =>
  Math.random()
    .toString(36)
    .substring(2, 15)
    .replace("1", " ")
    .repeat(nb);
const rand = limit => Math.floor(Math.random() * limit + 1);
const generateId = () => `${rand(1000000000000)}`;
const generateDate = () => new Date(1502561705000 + rand(1000 * 3600 * 24 * 365));
const generateQuantity = () => rand(10);
const generateItem = () => ({ id: generateId(), description: generateWord(rand(5)), quantity: generateQuantity() });
const generateUserList = length => Array.from(new Array(length), (val, index) => index).map(i => `User${i}`);
const users = generateUserList(nbUsers);
const generateLoan = id => ({
  id,
  name: users[rand(nbUsers - 1)],
  lent: generateDate(),
  returned: Math.random() < 0.5 && generateDate()
});

const generateItems = () => {
  const result = [];
  for (let i = 0; i < nbItems; i++) {
    result.push(generateItem());
  }
  return result;
};

const generateLoans = items => {
  const result = [];
  for (let i = 0; i < nbLoans; i++) {
    result.push(generateLoan(items[rand(nbItems - 1)].id));
  }
  return result;
};

export default () => {
  const items = generateItems();
  const loans = generateLoans(items);
  db.import({ items, loans });
};
