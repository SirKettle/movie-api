import * as R from 'ramda';

import { createAxiosApi } from '../../util/api';

const api = createAxiosApi('https://itunes.apple.com');

const ENDPOINTS = {
  SEARCH: `/search`,
};

const ENTITY = {
  MOVIE: `movie`,
};

export const apiService = () => ({
  getMovieResults: title =>
    api.get(ENDPOINTS.SEARCH, { params: { term: title, entity: ENTITY.MOVIE } }).then(R.path(['data', 'results'])),
});
