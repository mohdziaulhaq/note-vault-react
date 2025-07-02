import React, {useState} from 'react';
import Header from './components/Header';
import './App.css';
import CreateArea from './components/CreateArea';
import Note from './components/Note';

function App(){
  const [notes, setNotes] = useState([]);

  function addNote(newNote){
    setNotes((prevValue) => {
      return [...prevValue, newNote];
    });
  }

  function deleteNote(id){
    setNotes((prevValue) =>{
      return [...prevValue.filter((note, index) =>
        index !== id)];
    });
  }
  
  return (
    <div className='App'>
      <Header/>
      <CreateArea onAdd={addNote}/>
      {notes.map((note, index) => (
        <Note key={index} 
              id={index} 
              title={note.title} 
              content={note.content}
              onDelete={deleteNote}
        />
      ))}
    </div>
    
  );
};
export default App;