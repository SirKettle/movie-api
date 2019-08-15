"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fields = exports.queries = exports.getDog = exports.getDogs = void 0;
var dogs = [{
  id: 'hattie',
  habits: ['sleeping', 'tennis balls'],
  name: 'Hattie',
  breed: 'Cocker spaniel'
}, {
  id: 'buddy',
  habits: ['barking', 'tennis balls', 'cuddles'],
  name: 'Buddy',
  breed: 'Boston Hua Hua'
}, {
  id: 'harvey',
  habits: ['footballs', 'eating', 'cuddles'],
  name: 'Harvey',
  breed: 'Labrador Retriever cross'
}, {
  id: 'beau',
  habits: ['footballs', 'eating', 'cuddles'],
  name: 'Beau',
  breed: 'Labrador Alsation cross'
}];

var getDogs = function getDogs() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(dogs);
    }, 400);
  });
};

exports.getDogs = getDogs;

var getDog = function getDog(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var dog = dogs.find(function (dog) {
        return dog.id === id;
      });

      if (dog) {
        resolve(dog);
      } else {
        reject("404 - dog not found with id '".concat(id, "'"));
      }
    }, 200);
  });
}; // Technique to use individual reslovers per field taken from: “GraphQL Resolvers: Best Practices”
// https://medium.com/paypal-engineering/graphql-resolvers-best-practices-cd36fdbcef55


exports.getDog = getDog;
var queries = {
  dogs: function dogs() {
    return getDogs();
  },
  dog: function dog(_, _ref) {
    var id = _ref.id;
    return {
      id: id
    };
  }
};
exports.queries = queries;
var fields = {
  Dog: {
    name: function name(_ref2) {
      var id = _ref2.id;
      return getDog(id).then(function (dog) {
        return "My name is ".concat(dog.name);
      });
    },
    habits: function habits(_ref3) {
      var id = _ref3.id;
      return getDog(id).then(function (dog) {
        return dog.habits;
      });
    },
    breed: function breed(_ref4) {
      var id = _ref4.id;
      return getDog(id).then(function (dog) {
        return dog.breed;
      });
    }
  }
};
exports.fields = fields;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = exports.types = void 0;
var types = "\n  type Dog {\n    id: ID!\n    name: String!\n    breed: String\n    habits: [String]!\n  }\n";
exports.types = types;
var queries = "\n  dog(id: ID): Dog\n  dogs: [Dog]!\n";
exports.queries = queries;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiService = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _constants = require("./constants");

var _api = require("../../util/api");

var _cartesianProduct = require("../../util/cartesianProduct");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var api = (0, _api.createAxiosApi)('https://api.themoviedb.org/3');
var ENDPOINTS = {
  CONFIGURATION: "/configuration",
  DISCOVER_MOVIES: "/discover/movie",
  DISCOVER_TV: "/discover/tv",
  MOVIE: function MOVIE(id) {
    return "/movie/".concat(id);
  },
  TV: function TV(id) {
    return "/tv/".concat(id);
  }
};
var genreCodesByMoods = R.map(function (key) {
  return _constants.moods[key].genres;
});
var genreCodesByKeys = R.map(function (key) {
  return _constants.GENRES[key];
});

var getDiscoverMovieParams = function getDiscoverMovieParams(_ref) {
  var genreQuery = _ref.genreQuery,
      sortBy = _ref.sortBy,
      personId = _ref.personId,
      _ref$allLanguages = _ref.allLanguages,
      allLanguages = _ref$allLanguages === void 0 ? false : _ref$allLanguages,
      _ref$page = _ref.page,
      page = _ref$page === void 0 ? 1 : _ref$page;
  return {
    page: page,
    include_video: false,
    include_adult: false,
    'vote_count.gte': _constants.MIN_VOTES,
    'primary_release_date.gte': 1945,
    with_original_language: allLanguages ? void 0 : 'en',
    with_people: personId || void 0,
    sort_by: _constants.SORT_BY[sortBy] || _constants.SORT_BY.HIGHEST_RATED,
    with_genres: genreQuery
  };
};

var logResults = function logResults(res) {
  console.log(res.length);
  return res;
};

var combineResponsesResults = R.compose(logResults, R.uniq, R.flatten, R.map(R.path(['data', 'results'])));

var getGenreQueries = function getGenreQueries() {
  var moods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var genres = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _cartesianProduct.uniqueCartesianProduct)(genreCodesByMoods(moods)).concat(genreCodesByKeys(genres).map(function (g) {
    return [g];
  })).map(function (codes) {
    return codes.join(',');
  });
};

var apiService = function apiService(_ref2) {
  var apiKey = _ref2.apiKey;
  var withBaseParams = {
    api_key: apiKey,
    language: 'en-US'
  };
  return {
    getMovie: function getMovie(id) {
      return api.get(ENDPOINTS.MOVIE(id), {
        params: _objectSpread({}, withBaseParams)
      }).then(R.prop('data'));
    },
    getMovies: function getMovies(_ref3) {
      var _ref3$moods = _ref3.moods,
          moods = _ref3$moods === void 0 ? [] : _ref3$moods,
          _ref3$genres = _ref3.genres,
          genres = _ref3$genres === void 0 ? [] : _ref3$genres,
          rest = _objectWithoutProperties(_ref3, ["moods", "genres"]);

      var genreQueries = getGenreQueries(moods, genres);
      (0, _api.logApiRequests)(ENDPOINTS.DISCOVER_MOVIES, {
        count: genreQueries.length
      });
      return Promise.all(genreQueries.map(function (genreQuery) {
        return api.get(ENDPOINTS.DISCOVER_MOVIES, {
          params: _objectSpread({}, withBaseParams, {}, getDiscoverMovieParams(_objectSpread({
            genreQuery: genreQuery
          }, rest)))
        });
      })).then(function (_ref4) {
        var _ref5 = _toArray(_ref4),
            responses = _ref5.slice(0);

        return combineResponsesResults(responses);
      });
    }
  };
};

exports.apiService = apiService;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moods = exports.GENRES = exports.MIN_VOTES = exports.SORT_BY = void 0;
// default 'sort_by' popularity.desc
var SORT_BY = {
  MOST_POPULAR: 'popularity.desc',
  LEAST_POPULAR: 'popularity.asc',
  HIGHEST_REVENUE: 'revenue.desc',
  LOWEST_REVENUE: 'revenue.asc',
  HIGHEST_RATED: 'vote_average.desc',
  LOWEST_RATED: 'vote_average.asc',
  RELEASED_NEWEST: 'release_date.desc',
  RELEASED_OLDEST: 'release_date.asc'
}; // min number of votes needed to show up in results - helps filter out home movies

exports.SORT_BY = SORT_BY;
var MIN_VOTES = 21;
exports.MIN_VOTES = MIN_VOTES;
var GENRES = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  TV_MOVIE: 10770,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37
};
exports.GENRES = GENRES;
var moods = {
  LAUGH: {
    shortLabel: 'Laugh',
    moodFor: 'Laughs',
    longLabel: 'Make me laugh!',
    genres: [GENRES.COMEDY]
  },
  MUSIC: {
    shortLabel: 'Tra la la!',
    moodFor: 'Music',
    longLabel: 'Singing and dancing',
    genres: [GENRES.MUSIC]
  },
  CRY: {
    shortLabel: 'Tears',
    moodFor: 'Tears',
    longLabel: 'Make me cry',
    genres: [GENRES.ROMANCE, GENRES.DRAMA]
  },
  ADVENTURE: {
    shortLabel: 'Adventure',
    moodFor: 'Adventure',
    longLabel: 'Take me on an adventure!',
    genres: [GENRES.ADVENTURE]
  },
  THRILL: {
    shortLabel: 'Thrill',
    moodFor: 'Thrills',
    longLabel: 'On the edge of my seat',
    genres: [GENRES.ACTION, GENRES.CRIME, GENRES.THRILLER]
  },
  CUDDLE: {
    shortLabel: 'Cuddle',
    moodFor: 'Cuddles',
    longLabel: 'I fancy a snuggle',
    genres: [GENRES.ROMANCE]
  },
  FANTASY: {
    shortLabel: 'Fantasy',
    moodFor: 'Fantasy',
    longLabel: 'Escape this world',
    genres: [GENRES.FANTASY, GENRES.SCIENCE_FICTION]
  },
  SCARE: {
    shortLabel: 'Scare',
    moodFor: 'Scares',
    longLabel: 'Brown pants time',
    genres: [GENRES.HORROR, GENRES.MYSTERY]
  },
  BLOOD: {
    shortLabel: 'Blood',
    moodFor: 'Blood',
    longLabel: 'I want to see some fighting',
    genres: [GENRES.WESTERN, GENRES.WAR]
  },
  LEARN: {
    shortLabel: 'Learn',
    moodFor: 'Learning',
    longLabel: 'Educate me',
    genres: [GENRES.DOCUMENTARY, GENRES.HISTORY]
  },
  FAMILY: {
    shortLabel: 'Family',
    moodFor: 'Family fun',
    longLabel: 'Kid friendly',
    genres: [GENRES.FAMILY]
  },
  ANIMATION: {
    shortLabel: 'Animation',
    moodFor: 'Animation',
    longLabel: 'Some moving illustrations',
    genres: [GENRES.ANIMATION]
  }
};
exports.moods = moods;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;

var _api = require("./api");

var queries = {
  movies: function movies(_) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var context = arguments.length > 2 ? arguments[2] : undefined;
    return (0, _api.apiService)(context).getMovies(params).then(function (json) {
      return json.map(function (result) {
        return {
          id: result.id,
          name: result.original_title,
          summary: result.overview,
          releaseDate: result.release_date,
          posterImage: result.poster_path,
          backgroundImage: result.backdrop_path
        };
      });
    });
  },
  movie: function movie(_, _ref, context) {
    var id = _ref.id;
    return (0, _api.apiService)(context).getMovie(id).then(function (result) {
      return {
        id: result.id,
        name: result.original_title,
        summary: result.overview,
        releaseDate: result.release_date,
        posterImage: result.poster_path,
        backgroundImage: result.backdrop_path
      };
    });
  }
};
exports.queries = queries;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = exports.types = void 0;
var types = "\n  type Movie {\n    id: ID!\n    name: String!\n    posterImage: String\n    backgroundImage: String\n    summary: String\n    releaseDate: String!\n  }\n"; // TODO: typeDefs - enums? build  dynamically using js? nullable/optional?

exports.types = types;
var queries = "\n  movies(\n    sortBy: String\n    personId: Int\n    allLanguages: Boolean\n    genres: [String]\n    moods: [String]\n  ): [Movie]!\n  movie(id: ID): Movie\n";
exports.queries = queries;
"use strict";

var _apolloServer = require("apollo-server");

var dogResolver = _interopRequireWildcard(require("./domain/dog/resolver"));

var dogTypeDefs = _interopRequireWildcard(require("./domain/dog/typeDefs"));

var movieResolver = _interopRequireWildcard(require("./domain/movie/resolver"));

var movieTypeDefs = _interopRequireWildcard(require("./domain/movie/typeDefs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral([" \n  # Import types from domains\n  ", "\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  type Query {\n    ", "\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var domains = {
  resolvers: [dogResolver, movieResolver],
  typeDefs: [dogTypeDefs, movieTypeDefs]
};

var resolvers = _objectSpread({
  Query: domains.resolvers.map(function (r) {
    return r.queries;
  }).reduce(function (acc, res) {
    return _objectSpread({}, acc, {}, res);
  }, {})
}, domains.resolvers.map(function (r) {
  return r.fields;
}).reduce(function (acc, res) {
  return _objectSpread({}, acc, {}, res);
}, {})); // console.log(resolvers.Query);
// TODO: Is there a more GraphQL way of extending this schema?


var typeDefs = (0, _apolloServer.gql)(_templateObject(), domains.typeDefs.map(function (t) {
  return t.types;
}), domains.typeDefs.map(function (t) {
  return t.queries;
}));

if (!process.env.TMDB_API_KEY) {
  throw new Error('API key missing for The Movie Database');
}

var server = new _apolloServer.ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: function context() {
    return {
      apiKey: process.env.TMDB_API_KEY
    };
  }
});
server.listen({
  port: process.env.PORT || 4000
}).then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80 Server ready at ".concat(url));
})["catch"](function (err) {
  return console.error(err);
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logApiRequests = exports.createAxiosApi = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-control': 'no-cache, must-revalidate, no-store'
};

var createAxiosApi = function createAxiosApi(baseURL) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var api = _axios["default"].create(_objectSpread({}, config, {
    baseURL: baseURL,
    headers: _objectSpread({}, defaultHeaders, {}, config.headers)
  }));

  return api;
};

exports.createAxiosApi = createAxiosApi;

var logApiRequests = function logApiRequests(url, _ref) {
  var _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? 1 : _ref$count;
  console.log("HTTP Request: ".concat(method, " '").concat(url, "'").concat(count > 1 ? " (".concat(count, " requests)") : ''));
};

exports.logApiRequests = logApiRequests;
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
