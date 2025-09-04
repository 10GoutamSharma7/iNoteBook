import React,{useContext} from 'react'
import noteContext from '../context/notes/note.Context';
import './style/Noteitem.css';

export default function Noteitem(props) {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

  return (
    <div className='col-md-8 diary-entry-col'>    
      <div className="note-card my-3">
        {note.tag && (
          <div className="bookmark-tag">
            <span>{note.tag}</span>
          </div>
        )}
        <div className="note-title d-flex align-items-center justify-content-between">
          {note.title}
          <span>
            <i className="fa-solid fa-trash diary-entry-icon" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success"); }}></i> &nbsp;
            <i className="fa-solid fa-pen-to-square diary-entry-icon" onClick={() => { updateNote(note); }}></i>
          </span>
        </div>
        <hr className="note-separator" />
        <div className="note-content">{note.description}</div>
        {note.reminder && (
          <div className="note-reminder" style={{
            fontFamily: 'Caveat, Indie Flower, cursive',
            fontSize: '1.1rem',
            color: '#6366f1',
            marginTop: '0.5rem'
          }}>
            ⏰ Reminder: {new Date(note.reminder).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  )
}
