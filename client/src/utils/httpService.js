import axios from 'axios';

async function post(url, body) {
  return axios.post(url, body);
}

async function get(url) {
  return axios.get(url);
}

export { post, get };
