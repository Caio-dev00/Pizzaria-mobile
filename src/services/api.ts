import axios from "axios";

const api = axios.create({
    baseURL: 'https://backend-restaurant1-82244d17aaa6.herokuapp.com'
})

export { api };