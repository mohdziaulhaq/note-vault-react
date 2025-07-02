import React from "react";
import { useState } from "react";

function CreateArea({onAdd}){

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const handleChange = (e) =>{
        const{name,value} = e.target;
        setNote(preValue => {
            return{
                ...preValue,
                [name]: value,
            }
        })
        console.log(e.target.value)
    }

    const submitButton = (event) =>{
        onAdd(note);
        setNote({
            title:"",
            content:""
        })
        event.preventDefault();
    };
    
    return(
        <div>
            <form>
                <input value={note.title} type="text" placeholder="Title" name="title" onChange={handleChange}/>
                <p>
                    <textarea  value={note.content} name="content" placeholder="Take a note." onChange={handleChange}>
                
                    </textarea>
                </p>
                <button onClick={submitButton}>Add</button>
            </form>
        </div>
    )
}

export default CreateArea;