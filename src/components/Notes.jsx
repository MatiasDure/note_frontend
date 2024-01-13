const Notes = () => {

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