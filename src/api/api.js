import axios from 'axios';
// import configs from '../config/index';

axios.interceptors.request.use((config) => {
  const newConfig = config;
  if (localStorage.getItem('token') != null) {
    newConfig.headers.Authorization = localStorage.getItem('token');
  }
  return newConfig;
}, (err) => {
  return Promise.reject(err);
});

function ApiRequest() {}

ApiRequest.prototype = {
  get: url => { return axios.get(url); },
  post: (url, data) => {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      url,
      data: JSON.stringify(data),
    });
  },
  delete: (url, data) => {
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      url,
      data: JSON.stringify(data),
    });
  },
};
const api = new ApiRequest();

export default api;
