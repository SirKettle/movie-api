import * as R from 'ramda';

const cartesianProduct = R.reduce((acc, list) => (acc.length ? R.map(R.unnest, R.xprod(acc, list)) : list), []);

const removeDupesAndSort = R.map(combo => R.uniq(combo).sort());

const uniqueCombos = R.compose(
  R.uniq,
  removeDupesAndSort,
  cartesianProduct,
);

export const uniqueCartesianProduct = (listOfLists = []) =>
  listOfLists.length > 1 ? uniqueCombos(listOfLists) : listOfLists;
