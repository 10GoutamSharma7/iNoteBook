import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/note.Context";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
import './style/Dashboard.css';
import NoteView from "./Noteview";

export default function Dashboard(props) {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:"", });
  const navigate = useNavigate();
  const [selectedNote, setSelectedNote] = useState(null); // ✅ track clicked note

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
    <div>
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
    <div>
      {/* ✅ Conditional Rendering */}
      {selectedNote ? (
        <NoteView note={selectedNote} onBack={() => setSelectedNote(null)} />
      ) : (
<div className="memories-container">
  <h1 style={{ fontFamily: 'Indie Flower, Caveat, Shadows Into Light', fontSize: '5rem' }}>
    Memories
  </h1>

<div className="container my-4">
  <div className="row">
    {notes.length === 0 && "No notes to display"}
    {notes.map((note) => (
      <div 
        key={note._id} 
        className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" 
        onClick={() => setSelectedNote(note)}
      >
        <Noteitem 
          updateNote={updateNote} 
          note={note} 
          showAlert={props.showAlert} 
        />
      </div>
    ))}
  </div>
</div>
</div>
)}
    </div>
    </div>
  )
}
