const generateId = () => Math.floor(Math.random() * 10000000);
const generateDate = () => new Date(Math.floor(Math.random() * 10000000000));
const generateDescription = () => Math.floor(Math.random() * 10000000);
const generateQuantity = () => Math.floor(Math.random() * 10 + 1);

const generateItem = () => ({ id: generateId(), description: generateDescription(), quantity: generateQuantity() });
const generateLoan = () => ({ id: generateId(), name: generateDescription(), lent: generateDate() });

export { generateItem, generateLoan };
