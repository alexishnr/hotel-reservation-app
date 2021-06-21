import React, { useEffect, useState } from 'react';
import '../App.css';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux'
import {getHotelData} from '../services/redux/selectors/selector'
import { HotelModel, Rooms } from '../hotel/models/HotelModel';
import { useHistory } from 'react-router';
import useSendHotelData from '../services/hooks/useSendHotelData';
import Header from '../navigation/components/Header';
import Footer from '../navigation/components/Footer';
import useBookARoom from '../services/hooks/useBookARoom';
import {Store} from "../services/redux/definitions";

const HotelHome = (): JSX.Element => {
  const {data} = useSelector<Store, { data: HotelModel[] }>(getHotelData);
  const [currentRoom, setCurrentRoom] = useState<Rooms | null>(null)
  const history = useHistory();
  const {sendHotelData} = useSendHotelData();
  const {addRoom} = useBookARoom()

  useEffect(() => {
    // Check if there is data, if not pass the data to redux
    if(!data.length) sendHotelData();

      // Set to currentRoom the room found thanks to his url
      data.forEach((hotel) => {
        if (hotel.url === history.location.pathname.split('/')[1]){
          hotel.rooms.forEach((room) => {
            if (room.url === history.location.pathname.split('/')[2]){ setCurrentRoom(room) }
          })
        } 
      });
  }, [data, sendHotelData, history.location.pathname]);

  // Add a room in the basket 
  const bookRoom =()=>{
    if(currentRoom) addRoom(currentRoom);
  };
  
  return (
    <div className="App">
      <Header title={currentRoom?.roomName ? currentRoom.hotelName : ""}/>
      <Box style={{cursor:"pointer"}}  width="100%" padding="20px" textAlign="left" onClick={()=>history.push(`/${currentRoom?.hotelUrl}`)}>
              <Typography variant="subtitle1">
                 Retour à la liste des chambres
              </Typography>
          </Box>
      <Box marginTop="50px" marginBottom="150px">
        <Container maxWidth='lg'>
          <Box marginBottom="50px">
            <Box width="50vw" display="flex" justifyContent="center" margin="auto">
              <img src={`/images/${currentRoom?.img}`} style={{width:"100%", margin:'auto'}} alt="room"/>
            </Box>
            <Box marginBottom="50px" marginTop="50px">
              <Typography variant="subtitle1">
                {currentRoom?.summary}
              </Typography>
            </Box>
          </Box>
          <Button onClick={bookRoom} color="primary" variant="contained"  type="submit">
            Réserver
          </Button>
        </Container>
      </Box>
      <Footer/>
    </div>
  );
}

export default HotelHome;
