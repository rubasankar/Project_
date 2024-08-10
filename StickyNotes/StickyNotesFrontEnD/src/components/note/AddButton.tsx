import { useContext, useRef } from "react";
import { NoteContext } from "../../context/NotesProvider";
import { NoteContextType } from "../../types/@types.note";
import colors from "../../assets/colors.json"
import ApiService from "../../ApiService";
import Plus from "../../icons/Plus";

const AddButton = () => {
    const startingPos = useRef(10);

    const { setNotes, isAuthorized } = useContext(NoteContext) as NoteContextType

    const addNote = async () => {
        const payload = {
            title: `test1`,
            content: `test`,
            position: {
                x: startingPos.current,
                y: startingPos.current,
            },
            colors: colors[0],
        };

        startingPos.current += 10;

        // console.log('payload', payload)
        if (isAuthorized !== null) {
            ApiService.post('/notes/', JSON.stringify(payload)).then((res) => {
                setNotes((prevState) => [res, ...prevState]);
            })
        } else {
            alert("Logged in user can create a new note!")
        }


    }

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;