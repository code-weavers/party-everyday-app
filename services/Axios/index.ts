import StorageUtils from '@/utils/storage.utils';
import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3010',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})

api.interceptors.request.use(
    async (config) => {
        const token = await StorageUtils.get('accessToken')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
