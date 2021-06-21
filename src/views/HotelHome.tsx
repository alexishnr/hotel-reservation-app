import React, { useEffect, useState } from 'react';
import '../App.css';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux'
import {getHotelData} from '../services/redux/selectors/selector'
import { HotelModel, Rooms } from '../hotel/models/HotelModel';
import { useHistory } from 'react-router';
import CardRoom from '../hotel/components/CardRoom';
import useSendHotelData from '../services/hooks/useSendHotelData';
import Header from '../navigation/components/Header';
import Footer from '../navigation/components/Footer';
import {Store} from "../services/redux/definitions";

const HotelHome = (): JSX.Element => {
  const {data} = useSelector<Store, { data: HotelModel[]}>(getHotelData);
  const [currentHotel, setCurrenHotel] = useState<HotelModel | null>(null)
  const history = useHistory();
  const {sendHotelData} = useSendHotelData();
  
  useEffect(() => {
    // Check if there is data, if not pass the data to redux
    if(data.length === 0){
      sendHotelData();
    }
    // Set to currentHotel the hotel found thanks to his url
      data.forEach((hotel:HotelModel) => {
        if (hotel.url === history.location.pathname.split('/')[1]) setCurrenHotel(hotel)
      });
  }, [data, sendHotelData, history.location.pathname ]);

  return (
    <div className="App">
      <Header title={currentHotel?.hotelName ?? ""}/>
      <Box style={{cursor:"pointer"}}  width="100%" padding="20px" textAlign="left" onClick={()=>history.push("/")}>
              <Typography variant="subtitle1">
                 Retour à la liste des hôtels
              </Typography>
          </Box>
      <Box marginTop="50px" marginBottom="150px">
        <Container maxWidth='lg'>
        <Box marginBottom="50px">
              <Typography variant="subtitle1">
                {currentHotel?.summary}
              </Typography>
            </Box>
          <Grid container spacing={1}>
          {
              currentHotel?.rooms.map((data: Rooms, i:number) => (
                <Grid item xs key={i}>
                  <CardRoom data={data}/>            
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </Box>
      <Footer/>
    </div>
  );
}

export default HotelHome;
