import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

function Note({title,content, onDelete, id}){
    return(
        <div className="note">
            <h1>{title}</h1>
            <p>{content}</p>
            <button onClick={() => onDelete(id)}><AiOutlineDelete size={28}/></button>
        </div>
    )
}

export default Note;