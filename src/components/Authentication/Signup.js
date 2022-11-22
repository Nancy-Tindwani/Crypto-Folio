import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { CryptoState } from "../Cryptocontext";
import { auth } from "../../firebase";
import Login from './Login';
import { updateProfile } from "firebase/auth";
import Alert from "../Alert";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [name,setName]=useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [open, setOpen] = useState(false);
    const { setAlert } = CryptoState();
    const handleClose = () => setOpen(false);
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
    try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}`,
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
      }};
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
                type="name"
                label="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
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
            <TextField
                variant="outlined"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
            
        </Box>
    )
}