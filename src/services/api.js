import axios from 'axios';

const api = axios.create({
  baseURL: 'http://wanderlustapi20190719105050.azurewebsites.net/api/',
});

export default api;
