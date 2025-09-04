import React from "react";
import "./style/Noteview.css";

export default function NoteView({ note, onBack }) {
  return (
    <div className="note-view-container">
        {/* Back button now INSIDE the paper */}
      <div className="note-paper">
        <h2 className="note-title">{note.title}</h2>
        <p className="note-description">{note.description}</p>
        {note.tag && <span className="note-tag">#{note.tag}</span>}
      </div>
      <button className="back-btn" onClick={onBack}>
          ← Back to Memories
        </button>
      
    </div>
  );
}


