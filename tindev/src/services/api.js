import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
//Para genymotion: 10.0.3.2
//Para Android Studio: 10.0.2.2
});

export default api;