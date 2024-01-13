import Note from "./Note";

const Notes = ({ notes, toggleNoteImportance, deleteNote }) => {
	return (
		<ul className="card">
			{notes.map((note) => {
				return (
					<Note
						key={note.id}
						note={note}
						toggleNoteImportance={toggleNoteImportance}
						deleteNote={deleteNote}
					/>
				);
			})}
		</ul>
	);
};

export default Notes;