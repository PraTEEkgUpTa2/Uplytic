import axios from 'axios';
import { BACKEND_URL } from './utils';

const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})

export default api;