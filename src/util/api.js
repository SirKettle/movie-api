import axios from 'axios';

const defaultHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-control': 'no-cache, must-revalidate, no-store',
};

export const getUriSafe = str => str.replace(/ /gi, '-').replace(/[^A-Za-z0-9_-]/gi, '');

export const createAxiosApi = (baseURL, config = {}, log = true) => {
  const api = axios.create({
    ...config,
    baseURL,
    headers: {
      ...defaultHeaders,
      ...config.headers,
    },
  });

  if (log) {
    api.interceptors.request.use(request => {
      console.log(`${request.method.toUpperCase()} ${request.baseURL}${request.url}`);
      return request;
    });
  }

  return api;
};

export const logApiRequests = (url, { method = 'GET', count = 1 }) => {
  console.log(`HTTP Request: ${method} '${url}'${count > 1 ? ` (${count} requests)` : ''}`);
};
