import axios from 'axios';

const baseURL = 'http://localhost:7001';

const instance = axios.create({ timeout: 5000, baseURL });

instance
    .interceptors
    .request
    .use(config => {

        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, err => {
        throw new Error('发起请求错误');
    })

instance
    .interceptors
    .response
    .use(res => {
        if (res.status === 200) {
            return (res && res.data) || '';
        } else {
            throw new Error(res.data.message);
        }
    }, err => {
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    window.location.href = "/login";
                    break;
            }
        }
    })

export default instance;