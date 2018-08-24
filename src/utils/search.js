/**
 * Returns true if any strings contains the expression
 * @param {String} expression
 * @param  {...String} strings
 */
const includes = (expression, ...strings) =>
  strings.some(i => i && i.toLowerCase && i.toLowerCase().includes(expression.toLowerCase()));

export { includes };
