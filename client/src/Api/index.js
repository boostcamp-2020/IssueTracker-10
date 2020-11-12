import axios from 'axios';

/**
 * @param {'get' | 'post' | 'put' | 'delete'} method
 * @param {string} url
 * @param {object} query
 * @param {object} data (method === 'POST' or 'PUT')
 */

export const authRequest = async () => {
  try {
    const res = await axios({
      method: 'GET',
      credentials: 'include',
      headers: {
        withCredentials: true,
      },
      url: process.env.AUTH_URL,
    });
    return res.data;
  } catch ({ response }) {
    return null;
  }
};

export const request = async (config) => {
  try {
    const res = await axios({
      headers: {
        Authorization: config.token,
        'Content-Type': 'application/json',
      },
      ...config,
      url: process.env.BASE_URL + config.url,
    });
    return { status: res.status, data: res.data };
  } catch ({ response }) {
    return { status: response.status };
  }
};

export const uploadRequest = async (config) => {
  try {
    const res = await axios({
      headers: {
        Authorization: config.token,
        'Content-Type': 'multipart/form-data',
      },
      ...config,
      url: process.env.BASE_URL + config.url,
    });

    return res.data;
  } catch ({ response }) {
    return null;
  }
};
