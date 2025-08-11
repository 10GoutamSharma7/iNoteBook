import React,{useContext} from 'react'
import noteContext from '../context/notes/note.Context';
import './style/Noteitem.css';

export default function Noteitem(props) {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

  return (
    <div className='col-md-3 diary-entry-col'>
      <div className="note-card my-3">
        <div className="note-title d-flex align-items-center justify-content-between">
          {note.title}
          <span>
            <i className="fa-solid fa-trash diary-entry-icon" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success"); }}></i> &nbsp;
            <i className="fa-solid fa-pen-to-square diary-entry-icon" onClick={() => { updateNote(note); }}></i>
          </span>
        </div>
        <hr className="note-separator" />
        <div className="note-content">{note.description}</div>
      </div>
    </div>
  )
}
