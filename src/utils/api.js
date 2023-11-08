import axios from 'axios';

const api = axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
});

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export default api;
export { putAccessToken, getAccessToken };
