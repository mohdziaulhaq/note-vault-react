import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteItems from "./NoteItems";
import { FiFilePlus } from "react-icons/fi";
import { Blocks } from "react-loader-spinner";
import Errors from "../Errors";
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

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <h2 className="text-2xl font-semibold mb-4">My Notes</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : notes.length === 0 ? (
//         <p>No notes found.</p>
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2">
//           {notes.map((note) => (
//             <div key={note.id} className="border p-4 rounded shadow">

//               <h3 className="font-bold text-lg mb-2">{note.title}</h3>
//               <p>{note.content}</p>
//               <p>{note.ownerUsername}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

return (
    <div className="min-h-[calc(100vh-74px)] sm:py-10 sm:px-5 px-0 py-4">
      <div className="w-[92%] mx-auto ">
        {!loading && notes && notes?.length > 0 && (
          <h1 className="font-montserrat  text-slate-800 sm:text-4xl text-2xl font-semibold ">
            My Notes
          </h1>
        )}
        {loading ? (
          <div className="flex  flex-col justify-center items-center  h-72">
            <span>
              <Blocks
                height="70"
                width="70"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
              />
            </span>
            <span>Please wait...</span>
          </div>
        ) : (
          <>
            {notes && notes?.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-96  p-4">
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
                        <FiFilePlus className="mr-2" size={24} />
                        Create New Note
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="pt-10 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 gap-x-5 justify-center">
                  {notes.map((item) => (
                    <NoteItems key={item.id} {...item} id={item.id} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;
