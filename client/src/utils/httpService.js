import axios from 'axios';

async function post(url, body) {
  return axios.post(url, body);
}

export { post };
