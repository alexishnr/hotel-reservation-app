import React, { useEffect } from 'react';
import '../App.css';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import CardHotel from '../hotel/components/CardHotel';
import useSendHotelData from '../services/hooks/useSendHotelData';
import { useSelector } from 'react-redux';
import { getHotelData } from '../services/redux/selectors/selector';
import Header from '../navigation/components/Header';
import Footer from '../navigation/components/Footer';
import {Store} from "../services/redux/definitions";
import {HotelModel} from "../hotel/models/HotelModel";

const Home = (): JSX.Element => {
  const {data} = useSelector<Store, {data: HotelModel[]}>(getHotelData);
  const {sendHotelData} = useSendHotelData();

  useEffect(() => {
    // Check if there is data, if not pass the data to redux
    if(data.length === 0){
      sendHotelData();
    }
  }, [data, sendHotelData]);
  
  return (
    <div className="App">
      <Header title={"Disney's Hotels"}/>
      <Box marginTop="50px">
        <Container maxWidth='lg'>
          <Grid container spacing={1}>
            <Box marginBottom="50px">
              <Typography variant="subtitle1">
              Nous vous garantissons le meilleur prix pour votre séjour à Disneyland Paris en réservant sur notre site ou auprès de notre centrale de réservation. Et si vous trouvez moins cher ailleurs, nous vous remboursons la différence et vous offrons une carte cadeau. Vous avez dit magique ?
              </Typography>
            </Box>
            {
              data.map((hotel:HotelModel, i:number) => (
                <Grid item xs>
                  <CardHotel data={hotel} key={i}/>
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

export default Home;
