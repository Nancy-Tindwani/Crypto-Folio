import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Typography, Autocomplete, TextField, Button, Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../components/Cryptocontext";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
// const rows = [
//     createData('Bitcoin', "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", "$55000", "+0.39%", "$1,038,422M"),
//     createData('Ethereum', "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png", "$556780", "+0.55%", "$1,045,78M"),
//     createData('Tether', "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png", "$552340", "+0.21%", "$1,234,550M"),

// ];
// const coinsearch = ["Bitcoin", "Ethereum", "Tether"];
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const HomePage = () => {
    const navigate = useNavigate();
    
    const { symbol,coin } = CryptoState();
    const[page,setPage]=useState(1);
    
    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                <Header />
                <Banner />
                <div align="center">
                    <Typography variant="h3">
                        Cryptocurrency Prices by Market Cap
                    </Typography>

                    <Autocomplete
                        onChange={(event, value) => navigate(`/coins/${value}`)}
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={coin.map((option) => option.id)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search cryptocurrency here....."
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                                sx={{ width: '900px', color: 'white', marginTop: '10px', borderRadius: 2 }}

                            />
                        )}
                    />
                </div>
                <div align="center">
                    <TableContainer component={Paper} sx={{ maxWidth: 1150, marginTop: '30px' }}>
                        <Table sx={{ minWidth: 500, maxWidth: 1150 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: '#EEBC1D', color: 'black', fontWeight: 'bold' }}>Coin</TableCell>
                                    <TableCell style={{ backgroundColor: '#EEBC1D', color: 'black', fontWeight: 'bold' }} align="right">Price</TableCell>
                                    <TableCell style={{ backgroundColor: '#EEBC1D', color: 'black', fontWeight: 'bold' }} align="right">24h Change</TableCell>
                                    <TableCell style={{ backgroundColor: '#EEBC1D', color: 'black', fontWeight: 'bold' }} align="right">Market Cap</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {coin.slice((page-1)*10,(page-1)*10+10).map((coins) => {
                                    let profit = coins?.price_change_percentage_24h >= 0;
                                    return (

                                        <TableRow
                                            key={coins.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >

                                            <TableCell align="left" style={{ backgroundColor: '#14161a', color: 'white', }}>
                                                <Grid container sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                    <Grid item xs={2}>
                                                        <Button onClick={() => navigate(`/coins/${coins.id}`)}>
                                                            <img alt={coins.name} src={coins.image} style={{ height: 50, width: 50, maxHeight: { xs: 233, md: 167 }, maxWidth: { xs: 350, md: 250 }, marginTop: '15px', borderRadius: 4, objectFit: 'cover' }} />
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="h6"  >
                                                            {coins.symbol.toUpperCase()}
                                                        </Typography>
                                                        <Typography variant="h7"  >
                                                            {coins.name}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align="right" style={{ backgroundColor: '#14161a', color: 'white', }}>
                                                {symbol} {numberWithCommas(coins?.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell align="right" style={{
                                                backgroundColor: '#14161a', color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 500,
                                            }}>
                                                {profit && "+"}
                                                {coins.price_change_percentage_24h}%
                                            </TableCell>
                                            <TableCell align="right" style={{ backgroundColor: '#14161a', color: 'white', }}>
                                                {symbol}{" "}{numberWithCommas(coins.market_cap.toString().slice(0, -6))}M
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Pagination
                    count={(coin?.length/10)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                      }}
                />
            </div>
        </ThemeProvider>

    );
};

export default HomePage;