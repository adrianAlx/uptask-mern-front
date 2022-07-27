'use strict';

import { axiosClient } from './../config/axios';

const setConfig = (method, data, token) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
  data,
});

export const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
  if (method === 'GET') return await axiosClient(endpoint);
  else return await axiosClient(endpoint, setConfig(method, data));
};
