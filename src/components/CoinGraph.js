import axios from "axios";
import { useEffect, useState } from "react";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { Button, TextField } from "@mui/material";
import Chart from 'chart.js/auto';
import { CircularProgress, Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Line } from "react-chartjs-2";
import { CryptoState } from "./Cryptocontext";
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const textstyle = {

    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    width: "22%",
}
const CoinGraph = (props) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();
    const [flag, setflag] = useState(false);
    const N = 100;
    const selectdays = Array.from({ length: N }, (_, index) => index + 1);
    //Chart.register(CategoryScale);
    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${props.coin}/market_chart?vs_currency=${currency}&days=${days}`).then((res) => {
            setflag(true);
            setHistoricData(res.data.prices);
            console.log(res.data.prices);
        }).catch(error => {
            if (!error.response) {
                console.log('Error: Network Error');
            } else {
                console.log(error.response);
            }
        })
    }, [days]);

    return (
        <ThemeProvider theme={darkTheme}>
            <div>

                {!historicData | flag === false ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={150}
                        thickness={1}
                    />
                ) : (
                    <>
                        <Line
                            data={{
                                labels: historicData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),

                                datasets: [
                                    {
                                        data: historicData.map((coin) => coin[1]),
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: "#EEBC1D",
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            {chartDays.map((day) => {

                                return (
                                    <SelectButton
                                        key={day.value}
                                        onClick={() => {
                                            setDays(day.value);
                                            setflag(false);
                                        }}
                                        selected={day.value === days}
                                    >
                                        {day.label}
                                    </SelectButton>
                                )
                            })}
                            
                            <TextField sx={{marginTop:'10px',marginLeft:'10px'}}
                                variant="outlined"
                                type="days"
                                size="small"
                                label="Enter Days"
                                color="warning"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}

                            />
                        


                        </div>
                        {/* <div style={{ alignItems: 'left', marginTop: '20px', marginLeft: '15px' }}>
                            <Box sx={{ minWidth: 120, maxHeight: '170px',alignItems:'left' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Days</InputLabel>
                                    <Select
                                        style={{ width: '235px' }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={days}
                                        label="Days"
                                        onChange={(e) => setDays(e.target.value)}
                                    >
                                        {selectdays.map((daysnumber) => {

                                            return (
                                                <MenuItem value={daysnumber}>{daysnumber}</MenuItem>
                                            )
                                        })}
                                        
                                    </Select>
                                </FormControl>
                            </Box>
                        </div> */}
                        
                    </>
                )}

            </div>
        </ThemeProvider>


    )
}
export default CoinGraph;