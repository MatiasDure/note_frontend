import axios from "axios";

const BASE_URL = "/api/notes";

const tokenHeader = (token) => {
	return ({
		headers: {
			"Authorization": `Bearer ${token}`
		}	
	});
};

const getData = (pPromise) => pPromise.then((res) => res.data); 

const getNotes = () => getData(axios.get(BASE_URL));

const createNote = (newNote, token) => getData(axios.post(BASE_URL, newNote, tokenHeader(token)));

const updateNote = (id, updatedNote) => getData(axios.put(`${BASE_URL}/${id}`, updatedNote));

const deleteNote = (id) => axios.delete(`${BASE_URL}/${id}`);

export default {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
};