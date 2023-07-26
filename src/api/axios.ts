import axios, { AxiosError } from 'axios'

import { storageToken } from '@/utils'

export const $google = axios.create({
    baseURL: 'https://www.googleapis.com'
})

$google.interceptors.request.use(config => {
    const token = storageToken()
    if (token) config.headers.Authorization = token
    return config
})

$google.interceptors.response.use(
    res => res,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.clear()
        }
        return Promise.reject(error)
    }
)
