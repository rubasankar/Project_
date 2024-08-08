import { createContext, FC, ReactNode, useEffect, useState } from 'react'
import Spinner from '../icons/Spinner.jsx';
import { Note, NoteContextType } from '../types/@types.note.js';
import fakeData from '../assets/TestData.js';
import { ACCESS_TOKEN } from '../constants.js';

export const NoteContext = createContext<NoteContextType | null>(null);

const NotesProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [notes, setNotes] = useState<Note[]>(fakeData);
    const [selectedNote, setSelectedNote] = useState<Note>(fakeData[0]);
    const [isAuthorized, setIsAuthorized] = useState<string | null>(localStorage.getItem(ACCESS_TOKEN));

    useEffect(() => {
        InitNotes();
    }, [isAuthorized]);

    const InitNotes = () => {
        setNotes(fakeData);
        setLoading(false);
    };


    return (
        <NoteContext.Provider value={{ notes, setNotes, selectedNote, setSelectedNote, isAuthorized, setIsAuthorized}}>
            {
                loading ? (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}>

                        <Spinner size="100" />
                    </div>
                ) : (
                    children
                )
            }

        </NoteContext.Provider>
    )
}

export default NotesProvider;