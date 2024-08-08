import { useContext, useEffect } from "react";
import Controls from "../components/Control";
import NoteCard from "../components/NoteCard";
import { NoteContext } from "../context/NotesProvider";
import { NoteContextType } from "../types/@types.note";
import DefaultProfile from "../auth/DefaultProfile";
import LoggedInProfile from "../auth/LoggedInProfile";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import ApiService from "../ApiService";


const NotesPage = () => {
    const { notes,setNotes, isAuthorized, setIsAuthorized} = useContext(NoteContext) as NoteContextType

    useEffect(() => {
        if (isAuthorized ) {
            auth().catch(() => {
                setIsAuthorized(localStorage.getItem(ACCESS_TOKEN));
            })
            if (isAuthorized) { getNotes() }

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthorized])

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        if (!token) {
            setIsAuthorized(null);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        if (tokenExpiration && tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(localStorage.getItem(ACCESS_TOKEN));
        }
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await ApiService.postWithoutToken("/api/user/login/token/refresh/", {
                'refresh': refreshToken,
            });
            console.log('res', res)
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.access)
                setIsAuthorized(localStorage.getItem(ACCESS_TOKEN))
            } else {
                setIsAuthorized(null)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(null);
        }
    };

    const getNotes = () => {
        ApiService.get('/notes/').then((res) => {
            setNotes(res);
            // console.log('notes res', res[0].unid);
        })
    };


    return (
        <>
            <div style={{ zIndex: "9999", }}>{isAuthorized !== null ? < LoggedInProfile /> : < DefaultProfile />}</div>
            <div>
                {
                    
                    notes.map((note) => (
                        <NoteCard key={note.unid} note={note} />))
                }
                <Controls />
            </div>
        </>

    );
}

export default NotesPage