import Trash from "../icons/Trash";
import React,{ useContext } from "react";
import { NoteContext } from "../context/NotesProvider";
import { NoteContextType } from "../types/@types.note";
import ApiService from "../ApiService";

interface props{
    noteId:string
}

const DeleteButton = ({ noteId }:props) => {
    
    const {setNotes,isAuthorized} = useContext(NoteContext) as NoteContextType
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDelete = async (_e:React.MouseEvent<HTMLDivElement>) => {
        setNotes((prevState) =>
            prevState.filter((note) => note.unid !== noteId)
        );
        isAuthorized?ApiService.delete(`/notes/delete/${noteId}/`):{}
    };
 
    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};
export default DeleteButton;