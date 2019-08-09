const axios = require('axios');

const defaultHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-control': 'no-cache, must-revalidate, no-store',
};

const createAxiosApi = (baseURL, config = {}) => {
  const api = axios.create({
    ...config,
    baseURL,
    headers: {
      ...defaultHeaders,
      ...config.headers,
    },
  });

  return api;
};

const buildUrlWithQueryParams = (url, queryParams) => {
  if (!queryParams) {
    return url;
  }
  const queryPart = Object.keys(queryParams)
    .filter(key => typeof queryParams[key] !== 'undefined')
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');
  return `${url}?${queryPart}`;
};

module.exports = {
  createAxiosApi,
  buildUrlWithQueryParams,
};
