import axios from 'axios';

async function post(url: string, body: any): Promise<any> {
  return axios.post(url, body);
}

export { post };
