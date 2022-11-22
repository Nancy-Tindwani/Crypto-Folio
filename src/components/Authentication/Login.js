import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { CryptoState } from "../Cryptocontext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setAlert}=CryptoState();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleSubmit = async () => {
        if (!email || !password) {
          setAlert({
            open: true,
            message: "Please fill all the Fields",
            type: "error",
          });
          return;
        }
    
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          
          setAlert({
            open: true,
            message: `Log in Successful. Welcome ${result.user.email}`,
            type: "success",
          });
    
          handleClose();
        } catch (error) {
          setAlert({
            open: true,
            message: error.message,
            type: "error",
          });
          return;
        }
      };
    return (
        <Box
            p={3}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <TextField
                variant="outlined"
                type="email"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                variant="outlined"
                label="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                style={{ backgroundColor: "#EEBC1D" }}
            >
                Login
            </Button>
        </Box>
    );
}