import { IconButton, Tooltip, Box } from '@mui/material';
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

    const handleopen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Tooltip title="Login">
                <IconButton
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex:9999,
                    }}

                    onClick={handleopen}
                >
                    <AccountCircle color='primary' sx={{ fontSize: 40 }} />
                </IconButton>
            </Tooltip>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
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
                        // background:'url("src/assets/background.jpg") no-repeat',
                        // backgroundPosition:'center',
                        // backgroundSize:'cover',
                        zIndex: 9999,
                    }}>
                        <LoginForm/>
                    </Box>
                </Modal>
            </div>
        </Box>



    )
}

export default DefaultProfile;