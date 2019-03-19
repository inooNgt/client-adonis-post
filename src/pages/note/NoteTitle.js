import React from 'react';

class NoteTitle extends React.Component {
  handleTitleClick = id => {
    console.log('handleTitleClick:', id);
    let elem = document.getElementById(`note${id}`);
    elem.scrollIntoView();
  };
  render() {
    const { notes } = this.props;
    return (
      <div>
        {notes.map((note, index) => (
          <div key={note.id}>
            <h3
              className='note-title'
              onClick={e => this.handleTitleClick(note.id)}
            >
              {index + 1}、{note.note_title}
            </h3>
          </div>
        ))}
      </div>
    );
  }
}

export default NoteTitle;
