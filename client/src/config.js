import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://vidtube-vidtube.herokuapp.com/api/"
})