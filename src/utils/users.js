import axios from "axios";

const BASE_URL = "/api/users";

const getData = (pPromise) => pPromise.then((res) => res.data); 

const login = () => getData(axios.get(`${BASE_URL}`));

export default {
    login
};