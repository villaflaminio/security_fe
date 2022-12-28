import axios from 'axios';

export const appAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    }
})
