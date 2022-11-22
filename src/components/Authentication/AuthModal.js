import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Backdrop, Paper } from '@mui/material';
import { Tabs } from '@mui/material';
import { AppBar } from '@mui/material';
import Fade from '@mui/material/Fade';
import { Tab } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from "react-google-button";
import { useState } from 'react';
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoState } from '../Cryptocontext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState(0);
    const { setAlert } = CryptoState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                setAlert({
                    open: true,
                    message: `Sign Up Successful. Welcome ${res.user.displayName}`,
                    type: "success",
                });

                handleClose();
            })
            .catch((error) => {
                setAlert({
                    open: true,
                    message: error.message,
                    type: "error",
                });
                return;
            });
    };

    return (
        <div>
            <Button
                variant="contained"
                style={{
                    width: 85,
                    height: 40,
                    marginLeft: 15,
                    backgroundColor: "#EEBC1D",
                }}
                onClick={handleOpen}
            >
                Login
            </Button>
            <Modal
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper style={{ width: '75vh' }}>
                    <Fade in={open}>
                        <div >
                            <AppBar
                                position="static"
                                style={{
                                    backgroundColor: "transparent",
                                    color: "white",
                                }}
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="fullWidth"
                                    style={{ borderRadius: 10 }}
                                >
                                    <Tab label="Login" />
                                    <Tab label="Sign Up" />
                                </Tabs>
                            </AppBar>
                            {value === 0 && <Login handleClose={handleClose} />}
                            {value === 1 && <Signup handleClose={handleClose} />}
                            <Box style={{
                                padding: 24,
                                paddingTop: 0,
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                                gap: 20,
                                fontSize: 20,
                            }}>
                                <span>OR</span>
                                <GoogleButton
                                    style={{ width: "100%", outline: "none" }}
                                    onClick={signInWithGoogle}
                                />
                            </Box>
                        </div>
                    </Fade>
                </Paper>

            </Modal>
        </div>
    );
}
