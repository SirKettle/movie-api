"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniqueCartesianProduct = void 0;

var R = _interopRequireWildcard(require("ramda"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var cartesianProduct = R.reduce(function (acc, list) {
  return acc.length ? R.map(R.unnest, R.xprod(acc, list)) : list;
}, []);
var removeDupesAndSort = R.map(function (combo) {
  return R.uniq(combo).sort();
});
var uniqueCombos = R.compose(R.uniq, removeDupesAndSort, cartesianProduct);

var uniqueCartesianProduct = function uniqueCartesianProduct() {
  var listOfLists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return listOfLists.length > 1 ? uniqueCombos(listOfLists) : listOfLists;
};

exports.uniqueCartesianProduct = uniqueCartesianProduct;