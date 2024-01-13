import { useState, useEffect, useRef } from "react";
// import axios from "axios";
import notesAxios from "./utils/notes";
import "./index.css";
import "./components/LoginForm";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";

function App() {
	const [notes, setNotes] = useState([]);
	const [errorMsg, setErrorMsg] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		notesAxios.getNotes()
			.then((initialNotes) => setNotes(initialNotes))
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		setUser(JSON.parse(window.localStorage.getItem("user")) || null);
	}, []);

	const handleLogOut = () => {
		window.localStorage.removeItem("user");
		setUser(null);
	};

	const toggleNoteImportance = (pNote) => {
		const updatedNoteImportance = {
			...pNote,
			important: !pNote.important
		};

		notesAxios.updateNote(pNote.id,updatedNoteImportance)
			.then((updatedNote) => setNotes(notes.map((note) => note.id === pNote.id ? updatedNote : note)));
	};

	const deleteNote = (pNoteId) => {
		notesAxios.
			deleteNote(pNoteId)
			.catch((err) => {
				setErrorMsg("Note does not exist.");
				setNotes(notes.filter((note) => note.id !== pNoteId));
				setTimeout(() => {
					setErrorMsg(null);
				}, 3000);
			});

		setNotes(notes.filter((note) => note.id !== pNoteId));
	};



	const loginForm = () => (
		<Toggleable buttonLabel="login">
			<LoginForm
				setUser={setUser}
				setErrorMsg={setErrorMsg}
			/>
		</Toggleable>
	);

	const noteFromRef = useRef();

	const createNote = (pNewNote) => {
	//add new note to db
		noteFromRef.current.toggleVisibility();
		notesAxios
			.createNote(pNewNote, user.token)
			.then((createdNote) => setNotes(notes.concat(createdNote)));
	};

	const noteForm = () => (
		<Toggleable buttonLabel="create new note" ref={noteFromRef}>
			<NoteForm
				createNote={createNote}
			/>
		</Toggleable>
	);

	return (
		<>
			{errorMsg && <div className='error'>{errorMsg}</div>}
			{
				!user
					? loginForm()
					: <div>
						<p>Hi {user.name}</p>
						{noteForm()}
						<button onClick={handleLogOut}>Logout</button>
					</div>
			}
			<Notes
				toggleNoteImportance={toggleNoteImportance}
				deleteNote={deleteNote}
				notes={notes}
			/>
		</>
	);
}

export default App;
