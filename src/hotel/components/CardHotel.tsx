import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin:"auto"
  },
});


export default function CardHotel(props):JSX.Element {
  const {url, img, hotelName, summary} = props.data;  
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={()=>history.push(url)}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={"/images/"+img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {hotelName.slice(0,25)+"..."}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {summary.slice(0,200)+"..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions onClick={()=>history.push(url)}>
        <Box display="flex" style={{cursor:"pointer"}} justifyContent="center" width="100%" color="orange" alignItems="center">
          <Typography variant="h6" >
            Visiter
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}