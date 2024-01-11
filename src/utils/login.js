import axios from "axios";

const BASE_URL = "/api/login";

const getData = (pPromise) => pPromise.then((res) => res.data); 

// const login = async () => await getData(axios.get(`${BASE_URL}`));
const login = async (user) => await getData(axios.post(`${BASE_URL}`, user));

export default {
    login
};