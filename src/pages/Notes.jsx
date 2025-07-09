import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/notes/fake"); // ✅ use /notes/fake here
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching mock notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">My Notes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {notes.map((note) => (
            <div key={note.id} className="border p-4 rounded shadow">
                
              <h3 className="font-bold text-lg mb-2">{note.title}</h3>
              <p>{note.content}</p>
              <p>{note.ownerUsername}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
