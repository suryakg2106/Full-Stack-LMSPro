import axios from 'axios'

const API_BASE = 'https://lms-backend-project-1-yy32.onrender.com/'

const Api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default Api;
