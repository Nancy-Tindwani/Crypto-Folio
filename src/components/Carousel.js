import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CryptoState } from './Cryptocontext';


// const items = [
//     <img src="https://media.istockphoto.com/photos/bitcoin-ecommerce-concept-on-digital-screen-picture-id1304093999?b=1&k=20&m=1304093999&s=170667a&w=0&h=Ec0WKS-XZk_FhkOi9gVagRV3WUSdUIjb289skcGE8Vw=" onDragStart={handleDragStart} role="presentation" />,
//     <img src="https://media.istockphoto.com/photos/global-connection-picture-id1335295270?b=1&k=20&m=1335295270&s=170667a&w=0&h=PNF6QH5FyD_XvDbn4nHtIVKdmmlN86fCHTgwvkZYvHA=" onDragStart={handleDragStart} role="presentation" />,
//     <img src="https://images.unsplash.com/photo-1630048421776-1f552787465d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGNyeXB0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" onDragStart={handleDragStart} role="presentation" />,
//     <img src="https://media.istockphoto.com/photos/intelligent-bit-coin-picture-id904127288?b=1&k=20&m=904127288&s=170667a&w=0&h=kZuGFIa6sMQ9E9rDkpV1gvFUJdQ_avvEMxkh0xCT2cQ=" onDragStart={handleDragStart} role="presentation" />,
// ];
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Gallery = () => {
    const [coin, setCoin] = React.useState([]);
    const {currency,symbol}=CryptoState();
    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`).then((res) => {
            setCoin(res.data)
            console.log(res.data);
        }).catch(error => {
            if (!error.response) {
                console.log('Error: Network Error');
            } else {
                console.log(error.response);
            }
        })
    }, [currency]);
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };
    const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
        marginTop: '150px'
    }
    const items = coin.map((coins) => {
        let profit = coins?.price_change_percentage_24h >= 0;
        return (
            <Link style={style} to={`/coins/${coins.id}`} >
                <img
                    src={coins?.image}
                    alt={coins?.name}
                    height="80"
                    style={{ marginBottom: 10 }} />
                <span>
                    {coins?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {coins?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                   {symbol} {numberWithCommas(coins?.current_price.toFixed(2))}
                </span>
            </Link>

        )
    })

    return (
        <div align="center">
            <AliceCarousel mouseTracking
                infinite
                autoPlayInterval={500}
                animationDuration={500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay />
        </div>

    );
}

export default Gallery;