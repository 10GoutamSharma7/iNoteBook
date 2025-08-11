import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/note.Context";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import './style/Notes.css';

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});
  const navigate = useNavigate();

  const ref = useRef(null); 
  const refClose = useRef(null); 


  useEffect(() => {
    // useEffect hook to get the notes from the server
    if(localStorage.getItem('token')){
      getNotes();
    }
    else {
      navigate("/login");
    }
  }, [ ]
  );

  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "success");
  }

  const onChange = (event)=>{
        // Here ...note means add or overwrite if the name has the following input value
        setNote({...note, [event.target.name]: event.target.value})
  }

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag});
  };

  return (
    <div >
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ fontFamily: 'Indie Flower, Caveat, Shadows Into Light' }}>
              <h1 className="modal-title fs-5" id="exampleModalLabel"> 
                Oop's Forget Something ! ?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>


            <div className="modal-body blackboard-modal-body">
              <form className="container my-3 blackboard-form">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label blackboard-label" style={{ fontFamily: 'Indie Flower, Caveat, Shadows Into Light' }}>
                    <span role="img" aria-label="chalk">✏️</span> !! Headline !!
                  </label>
                  <input
                    type="text"
                    className="form-control blackboard-input"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                    style={{ fontFamily: 'Indie Flower, Caveat, Shadows Into Light' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label blackboard-label" style={{ fontFamily: 'Indie Flower, Caveat, Shadows Into Light' }}>
                    <span role="img" aria-label="thought">💭</span> What's on your mind?
                  </label>
                  <input
                    type="text"
                    className="form-control blackboard-input"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                    style={{ fontFamily: 'Indie Flower, Caveat, Shadows Into Light' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label blackboard-label" style={{ fontFamily: 'Indie Flower, Caveat, Shadows Into Light' }}>
                    <span role="img" aria-label="caption">🏷️</span> #Caption
                  </label>
                  <input
                    type="text"
                    className="form-control blackboard-input"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    style={{ fontFamily: 'Indie Flower, Caveat, Shadows Into Light' }}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                style={{ fontFamily: 'Indie Flower, Caveat, Shadows Into Light' }}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div >
  <h2 id="Memories" className="memories-heading">
    <span className="notebook-logo" role="img" aria-label="notebook">📓</span>
    <span className="memories-text">Memories</span>
  </h2>
      <div className="row my-3 ">
        <div className="col-mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>        
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          );
        })}
      </div>
      </div>
    </div>
  );
}
