import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import useBookARoom from '../../services/hooks/useBookARoom';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin:"auto"
  },
});


export default function CardHotel(props):JSX.Element {
  const {url, img, roomName, price, summary, hotelUrl} = props.data;
  const classes = useStyles();
  const history = useHistory();
  const {addRoom} = useBookARoom()

  // Add a room in the basket 
  const bookRoom =()=>{
    addRoom(props.data);
  };
  

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={()=>history.push(`/${hotelUrl}/${url}`)}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={"/images/"+img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {roomName.slice(0,25)+"..."}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="h6">
            À partir de {price}€
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {summary.slice(0,200)+"..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Box display="flex" style={{cursor:"pointer"}} justifyContent="space-between" width="100%" color="orange" alignItems="center">
        <Box display="flex" onClick={()=>bookRoom()} style={{cursor:"pointer"}}>
          <Typography variant="h6" >
          Réserver
          </Typography>
        </Box>
        <Box display="flex" onClick={()=>history.push(`/${hotelUrl}/${url}`)} style={{cursor:"pointer"}}>
          <Typography variant="h6" >
          Voir plus
          </Typography>
        </Box>
      </Box>
      </CardActions>
    </Card>
  );
}