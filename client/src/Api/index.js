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
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzYnllb2wzIiwiaWF0IjoxNjA0NTY1ODM5LCJleHAiOjE2MDQ2NTIyMzl9.tjY-D5afSMBoJt7ocbFu18gDog48uiIV1v6yx_kRKk0',
        'Content-Type': 'application/json',
      },
      ...config,
      url: process.env.BASE_URL + config.url,
    });
    return res.data;
  } catch ({ response }) {
    console.log(response);
    return {};
  }
};

export default request;
