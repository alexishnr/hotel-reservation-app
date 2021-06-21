import React from 'react';
import '../App.css';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { order } from '../services/redux/selectors/selector';
import { Rooms } from '../hotel/models/HotelModel';
import Header from '../navigation/components/Header';
import Footer from '../navigation/components/Footer';
import { useHistory } from 'react-router';
import { PaymentDataModel } from '../hotel/models/PaymentDataModel';
import { Store } from '../services/redux/definitions';

const Confirmation = () : JSX.Element=> {
  // const {data} = useSelector(order);
  const {data} = useSelector<Store, { data: PaymentDataModel }>(order);
  const history = useHistory();
  

  // Render the total of the order
  const total =():string=>{
    let total = 0;
    data.order.forEach((book:Rooms) => {
      if(book.quantity) total = total + parseInt(book.price) * book.quantity
    });
    return `Total : ${total.toString()}€`
  };  
  
  return (
    <div className="App">
      <Header title={"Disney's Hotels"}/>
      <Box marginTop="50px">
        <Container maxWidth='lg'>
          <Grid container spacing={1}>
            {data && data.order ?
            (
              <Box display="flex" flexDirection="column" width="100%">
                <Box marginBottom="50px" >
                  <Box>
                    <Typography variant="h4">
                    Bonjour {data.user.firstname} {data.user.name} merci pour votre commande, 
                    </Typography>
                  </Box>
                </Box>
                <Box marginBottom="20px">
                    <Typography variant="h6">
                    Résumé de votre commande
                    </Typography>
                  </Box>
                {
                  data?.order.map((data:Rooms, i:number) => (
                    <Box display="flex" flexDirection="column" marginBottom="10px">
                        <Box display="flex" justifyContent="center" key={i}>
                            <Box display="flex">
                                <Typography>
                                    {data.hotelName} - {data.roomName} - {data.price}€ x {data.quantity}
                                </Typography>
                        </Box>
                      </Box>
                      <Box height="1px" marginTop="10px" bgcolor="#b7b7b7"/>
                    </Box>
                  ))
                }
                <Box>
                    <Typography variant="h6">
                    {total()}
                    </Typography>
                  </Box>
                  <Box marginTop="50px">
                    <Typography variant="subtitle1">
                    Addresse de facturation
                    </Typography>
                  </Box>
                  <Box marginTop="10px">
                    <Typography variant="subtitle1">
                      {data.user.firstname} {data.user.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">
                    {data.user.address}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">
                    {data.user.email}
                    </Typography>
                  </Box>
                  <Box marginTop="50px" marginBottom="50px">
                    <Typography variant="h6">
                      À bientôt !
                    </Typography>
                  </Box>
              </Box>
            ):(
              <Box marginTop="50px" display="flex" flexDirection="column" width="100%">
                <Typography variant="h6">
                  Panier vide
                </Typography>
                <Box marginTop="20px" onClick={()=>history.push(`/`)} style={{cursor:"pointer"}}>
                    <Typography variant="h6">
                      Retour
                    </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Container>
      </Box>
      <Footer/>
    </div>
  );
}

export default Confirmation;
