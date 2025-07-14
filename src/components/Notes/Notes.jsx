import api from "../../services/api";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
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
        <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    You didn't create any note yet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Start by creating a new note to keep track of your thoughts.
                  </p>
                  <div className="w-full flex justify-center">
                    <Link to="/create-note">
                      <button className="flex items-center px-4 py-2 bg-btnColor text-white rounded  focus:outline-none focus:ring-2 focus:ring-blue-300">
                        {/* <FiFilePlus className="mr-2" size={24} /> */}
                        Create New Note
                      </button>
                    </Link>
                  </div>
                </div>
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
