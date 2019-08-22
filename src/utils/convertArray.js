const titleCase = require('./titleCase');

module.exports = (obj, prop) => {
  const array = obj[prop];
  const conjunction = prop === 'enemies' ? 'or' : 'and';
  if (!array) return '';
  if (array.length === 1) return titleCase(array[0]);
  if (array.length === 2)
    return `${titleCase(array[0])} ${conjunction} ${array[1].toLowerCase()}`;
  const middle = array
    .slice(1, -1)
    .map(item => item.toLowerCase())
    .join(', ');
  return `${titleCase(array[0])}, ${middle}, ${conjunction} ${
    array[array.length - 1]
  }`;
};
