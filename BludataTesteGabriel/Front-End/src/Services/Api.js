import axios from 'axios';

const Api = axios.create({ baseURL: 'https://localhost:44375/v1' });

export default Api;
