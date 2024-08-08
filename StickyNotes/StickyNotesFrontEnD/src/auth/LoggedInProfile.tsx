import { useContext } from "react"
import { NoteContext } from "../context/NotesProvider"
import { NoteContextType } from "../types/@types.note"
import { IconButton, Avatar, Tooltip, Box, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


const LoggedInProfile = () => {

    const { setIsAuthorized } = useContext(NoteContext) as NoteContextType

    function Logout() {
        setIsAuthorized(null);
        window.localStorage.clear()
    }

    return (
        <Box zIndex={9999}>
            <Tooltip title="profile">
                <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={-1}>
                    <IconButton>
                        <Avatar sx={{ bgcolor: "blueviolet", }}>G</Avatar>
                    </IconButton>
                    <IconButton onClick={Logout}>
                        <Avatar sx={{ bgcolor: "black" }}>
                            <LogoutIcon fontSize="medium" />
                        </Avatar>
                    </IconButton>
                </Stack>

            </Tooltip>
        </Box>
    )
}

export default LoggedInProfile