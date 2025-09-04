// import Notes from './Notes'
import AddNote from './AddNote';
import { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/note.Context';

export default function Home(props) {
  const {showAlert} = props;
  const context = useContext(noteContext);
  const { notes } = context;

  // ...then add your notification useEffect here, using notes as before.

  return (
    <div className='container my-3'>
      <AddNote showAlert={showAlert} />
      {/* <Notes showAlert={showAlert}/> */}
    </div>
  )
}
