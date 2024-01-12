
const Note = ({ note, toggleNoteImportance, deleteNote }) => {
	return (
		<li key={note.id} className='note'>
			{note.content}
			<button type="button" onClick={() => toggleNoteImportance(note)}>{note.important ? "make not important" : "make important"}</button>
			<button type="button" onClick={() => deleteNote(note.id)}>delete</button>
		</li>
	);
};

export default Note;