import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/notes", note);
      navigate("/notes"); // Redirect after success
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Create Note</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
          className="border px-3 py-2 rounded"
          required
        />
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Content"
          className="border px-3 py-2 rounded"
          rows="5"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
