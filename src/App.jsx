// import React, {useState} from 'react';
// import Header from './components/Header';
// import './App.css';
// import CreateArea from './components/CreateArea';
// import Note from './components/Note';

// function App(){
//   const [notes, setNotes] = useState([]);

//   function addNote(newNote){
//     setNotes((prevValue) => {
//       return [...prevValue, newNote];
//     });
//   }

//   function deleteNote(id){
//     setNotes((prevValue) =>{
//       return [...prevValue.filter((note, index) =>
//         index !== id)];
//     });
//   }
  
//   return (
//     <div className='App'>
//       <Header/>
//       <CreateArea onAdd={addNote}/>
//       {notes.map((note, index) => (
//         <Note key={index} 
//               id={index} 
//               title={note.title} 
//               content={note.content}
//               onDelete={deleteNote}
//         />
//       ))}
//     </div>
    
//   );
// };
// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Notes from "./components/Notes/Notes";
import CreateNote from "./components/Notes/CreateNote";
import Profile from "./pages/Profile";
import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;

