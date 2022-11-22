import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import React from "react";
import Gallery from "./Carousel";
import  img from '../Images/banner2.jpg';
const Banner = () => {
  return (
    <>
    <Container>
        <div style={{backgroundImage: "url(./banner2.jpg)",height:450}}>
        <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
            >
            Crypto Folio
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
          <Gallery/>
        </div>
        
    </Container>
    </>
  );
};

export default Banner;