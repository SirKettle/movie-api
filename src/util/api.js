import axios from 'axios';

const defaultHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-control': 'no-cache, must-revalidate, no-store',
};

export const createAxiosApi = (baseURL, config = {}) => {
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

export const logApiRequests = (url, { method = 'GET', count = 1 }) => {
  console.log(`HTTP Request: ${method} '${url}'${count > 1 ? ` (${count} requests)` : ''}`);
};
