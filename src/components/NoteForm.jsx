import { useState } from "react";

const NoteForm = ({createNote}) => {
	const [newNote, setNewNote] = useState("");

	const handleNewNote = (e) => {
		setNewNote(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
	
		createNote({
			content: newNote,
			important: true,
		});
	
		//reset controlled input
		setNewNote("");
	}

	return (
		<div>
			<h2>Create a new note</h2>
			<form onSubmit={handleSubmit}>
					<input type="text" value={newNote} onChange={handleNewNote}/>
					<button type="submit">Add</button>
			</form>
		</div>
	)
}

export default NoteForm;