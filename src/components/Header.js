import { AppBar, Toolbar, Typography, FormControl, Box, Select, MenuItem, InputLabel, createTheme, ThemeProvider, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate} from "react-router-dom";
import AuthModal from "./Authentication/AuthModal";
import { CryptoState } from "./Cryptocontext";
import UserSidebar from "./Authentication/UserSidebar";
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    backgroundColor: '#14161a'
});

const Header = () => {
    let navigate=useNavigate();
    
    const {currency,setCurrency,user}=CryptoState();
    
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" sx={{
                            display: { xs: 'none', sm: 'block' }, color: 'gold', fontFamily: "Montserrat",
                            fontWeight: "bold",
                            cursor: "pointer", flex: 1
                        }} onClick={()=>navigate('/')}>
                            Crypto Folio
                        </Typography>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currency}
                                    label="currency"
                                    //onChange={handleChange}
                                    onChange={(e)=>setCurrency(e.target.value)}
                                    sx={{ width: 120, height: 50, color: 'white' }}
                                >
                                    <MenuItem value={"USD"}>USD</MenuItem>
                                    <MenuItem value={"INR"}>INR</MenuItem>

                                </Select>
                            </FormControl>
                        </Box>
                        {user ? <UserSidebar /> : <AuthModal />}
                    </Toolbar>
                </Container>
            </AppBar>

        </ThemeProvider>


    );
};

export default Header;