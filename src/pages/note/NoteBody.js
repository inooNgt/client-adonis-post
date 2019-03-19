import React from 'react';

const NoteBody = ({ notes }) => (
  <article className='note-body'>
    {notes.map((note, index) => (
      <section className='note-body-item' key={note.id} id={`note${note.id}`}>
        <h3>
          {index + 1}、{note.note_title}
        </h3>
        <div
          className='note-body-content'
          dangerouslySetInnerHTML={{ __html: note.note_body }}
        />
      </section>
    ))}
  </article>
);

export default NoteBody;
