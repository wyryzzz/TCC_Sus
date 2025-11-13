import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5010'
})

// Interceptor para adicionar o token dinamicamente em cada requisição
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
