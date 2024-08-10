import { useContext, useState } from "react"
import { NoteContext } from "../../context/NotesProvider"
import { NoteContextType } from "../../types/@types.note"
import { IconButton, Avatar, Tooltip, Box, Menu, MenuItem } from '@mui/material';
import ApiService from "../../ApiService";
// import LogoutIcon from '@mui/icons-material/Logout';


const LoggedInProfile = () => {

    const { setIsAuthorized } = useContext(NoteContext) as NoteContextType
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openM = Boolean(anchorEl);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    function Logout() {
        setIsAuthorized(null);
        const res = ApiService.post("/rest/logout/", {})
        console.log('res', res)
        // window.localStorage.clear()
    }

    return (
        <Box zIndex={9999}>
            <Tooltip title="profile">
                <IconButton
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 9999,
                    }}
                    onClick={handleClickMenu}
                >
                    <Avatar sx={{ bgcolor: "blueviolet", }}>G</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                id="Default-profile-menu"
                anchorEl={anchorEl}
                open={openM}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={Logout}>Logout</MenuItem>
            </Menu>
        </Box>
    )
}

export default LoggedInProfile