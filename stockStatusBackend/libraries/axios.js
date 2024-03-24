import axios from 'axios';

function getAxiosInstance(BASE_URL, headers = {}) {
  return {
    get(method, params = {}, headers = {}) {
      return axios.get(`/${method}`, { baseURL: BASE_URL, params, headers });
    },
    post(method, data = {}, headers = {}) {
      return axios.post({
        method: 'post',
        baseURL: BASE_URL,
        url: '/${method}',
        data,
        headers
      });
    },
    put(method, data = {}, headers = {}) {
      return axios.put({
        method: 'put',
        baseURL: BASE_URL,
        url: '/${method}',
        data,
        headers
      });
    },
    delete(method, data = {}, headers = {}) {
      return axios.delete({
        method: 'delete',
        baseURL: BASE_URL,
        url: '/${method}',
        data,
        headers
      });
    }
  };
}
