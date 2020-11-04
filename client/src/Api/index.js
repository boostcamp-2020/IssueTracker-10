import axios from 'axios';

/**
 * @param {'get' | 'post' | 'put' | 'delete'} method
 * @param {string} url
 * @param {object} query
 * @param {object} data (method === 'POST' or 'PUT')
 */

const request = async (config) => {
  try {
    const res = await axios({
      headers: {
        Authorization: '',
        'Content-Type': 'application/json',
      },
      ...config,
      url: process.env.BASE_URL,
    });
    return res.data;
  } catch ({ response }) {
    console.log(response);
    return {};
  }
};

export default request;
