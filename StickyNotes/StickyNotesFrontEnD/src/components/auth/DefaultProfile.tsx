import { IconButton, Tooltip, Box, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginForm from './LoginForm';


import React from 'react';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    pt: 2,
    px: 4,
    pb: 3,
};


const DefaultProfile = () => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openM = Boolean(anchorEl);

    const handleopenLoginForm = () => {
        setOpen(true);
        setAnchorEl(null);
    }
    const handleCloseLoginForm = () => {
        setOpen(false);
    };

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Tooltip title="Account">
                <IconButton
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 9999,
                    }}

                    onClick={handleClickMenu}
                >
                    <AccountCircle color='primary' sx={{ fontSize: 40 }} />
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
                <MenuItem onClick={handleopenLoginForm}>Login</MenuItem>
                <MenuItem onClick={handleCloseMenu}>SignUp</MenuItem>
            </Menu>

            <div>
                <Modal
                    open={open}
                    onClose={handleCloseLoginForm}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{
                        ...style,
                        borderRadius: '10px',
                        height: '50%',
                        border: 0,
                        boxSizing: 'border-box',
                        margin: 0,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                    }}>
                        <LoginForm />
                    </Box>
                </Modal>
            </div>
        </Box>



    )
}

export default DefaultProfile;