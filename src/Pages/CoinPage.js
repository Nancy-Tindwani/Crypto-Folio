import { Grid, Typography, Button, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../components/Cryptocontext";
import Header from "../components/Header";
import parse from 'html-react-parser';
import CoinGraph from "../components/CoinGraph";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const desstyle = {
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
}
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user,watchlist,setAlert} = CryptoState();
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then((res) => {
      setCoin(res.data)
      //console.log(res.data);
    }).catch(error => {
      if (!error.response) {
        console.log('Error: Network Error');
      } else {
        console.log(error.response);
      }
    })
  }, [currency]);

  const inWatchlist = watchlist.includes(coin?.id);
  
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Header />
        <div align="center">
          <Grid container spacing={2}>
            <Grid item xs={3.5} sx={{ borderRight: 2, borderColor: 'grey', marginTop: '70px' }}>
              <img
                src={coin?.image.large}
                alt={coin?.name}
                height="200"
                style={{ marginBottom: 20 }}
              />
              <Typography variant='h4' sx={{ fontFamily: "Montserrat", fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}>
                {coin?.name}
              </Typography>
              <Typography variant=" subtitle1" sx={{ color: 'gray', marginTop: '10px', textAlign: 'left', fontFamily: "Montserrat", fontSize: '15px' }}>
                <div dangerouslySetInnerHTML={{ __html: coin?.description.en.split(". ")[0] }} />
              </Typography>
              <div align='left'>
                <Typography variant='h6' sx={{ fontFamily: "Montserrat", fontWeight: 'bold', marginTop: '35px', marginLeft: '10px' }}>
                  Rank : {numberWithCommas(coin?.market_cap_rank)}
                </Typography>
                <Typography variant='h6' sx={{ fontFamily: "Montserrat", fontWeight: 'bold', marginTop: '10px', marginLeft: '10px' }}>
                  Current Price : {symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                </Typography>
                <Typography variant='h6' sx={{ fontFamily: "Montserrat", fontWeight: 'bold', marginTop: '10px', marginLeft: '10px' }}>
                  Market Cap : {symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
                </Typography>
              </div>
              {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                color:'black',
                fontWeight:'bold',
                marginTop:'25px'
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
            </Grid>
            <Grid item xs={8.3} style={{ marginTop: '70px' }}>
              <CoinGraph coin={id} />

            </Grid>
          </Grid>
        </div>

      </div>
    </ThemeProvider>

  );
};

export default CoinPage;