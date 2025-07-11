import axios from "../../api/axios";
import React, { useEffect, useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/notes");
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
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4">My Notes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {notes.map((note) => {
            let content = note.content;
            try {
              const parsed = JSON.parse(note.content);
              content = parsed.content || note.content;
            } catch (e) {}
            return (
              <div key={note.id} className="border p-4 rounded shadow">
                <h3 className="font-bold text-lg mb-2">{note.title}</h3>
                <p>{content}</p>
                <p className="text-sm text-gray-500">{note.ownerUsername}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notes;
