import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/note.Context';
import './style/AddNote.css';

export default function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:"pagleeeee"});

    const handleClick = (e)=>{
        // To prevent reloading, The preventDefault() method is used to 
        // prevent the browser from executing the default action of the 
        // selected element. It can prevent the user from processing the request by clicking the link.
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
        props.showAlert("Note Added Successfully","success");
    }

    const onChange = (event)=>{
        // Here ...note means add or overwrite if the name has the following input value
        setNote({...note, [event.target.name]: event.target.value})
    }

    return (
      <div className="addnote-suspended-wrapper">
        <h1 className="addnote-title" style={{fontFamily: 'Indie Flower, Caveat, Shadows Into Light', fontSize: '5rem'}}>Any Note</h1>
        <div className="addnote-string-rope">
          <div className="addnote-string addnote-string-1"></div>
          <div className="addnote-string addnote-string-2"></div>
        </div>
        <form className="addnote-suspended-form">
          <div className="addnote-block addnote-block-headline">
            <label htmlFor="title" className="form-label" style={{fontFamily: 'Indie Flower, Caveat, Shadows Into Light' ,fontSize: '2rem'}}>!! Headline !!</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="addnote-block addnote-block-description">
            <label htmlFor="description" className="form-label" style={{fontFamily: 'Indie Flower, Caveat, Shadows Into Light' ,fontSize: '2rem'}}>What's on your mind ??</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="addnote-block addnote-block-tag">
            <label htmlFor="tag" className="form-label" style={{fontFamily: 'Indie Flower, Caveat, Shadows Into Light' ,fontSize: '2rem'}}>#Caption</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="text-white-50 fw-bold"
            onClick={handleClick} 
            id='add-note-button'
          >
            OK I'll Remember
          </button>
        </form>
      </div>
    );
}
