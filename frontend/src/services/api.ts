import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL:API_URL,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json',
    },
});

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('accessToken');

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=> Promise.reject(error)
);
export default api;