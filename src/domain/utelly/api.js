import * as R from 'ramda';

import { createAxiosApi } from '../../util/api';

// Docs: https://rapidapi.com/utelly/api/utelly/endpoints
const api = createAxiosApi('https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com', {
  headers: {
    'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
  },
});

const ENDPOINTS = {
  LOOKUP: `/lookup`,
};

const REGION = {
  UK: 'uk',
  US: 'us',
};

export const apiService = ({ utellyApiKey }) => ({
  getStreamingAvailability: (title, country = REGION.UK) =>
    api
      .get(ENDPOINTS.LOOKUP, { params: { term: title, country }, headers: { 'x-rapidapi-key': utellyApiKey } })
      .then(R.path(['data', 'results'])),
});
