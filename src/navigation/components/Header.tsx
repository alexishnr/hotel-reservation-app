import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BasketModal from '../../order/components/BasketModal';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router';
import { HeaderModel } from '../models/HeaderModel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor:"#282c34"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


export default function Header(props:HeaderModel) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root} >
      <AppBar position="static">
        <Toolbar className={classes.root}>
            <Box display="flex" justifyContent="space-between" width="100%" height="100px"  alignItems="center">
                <Box width="100px" style={{cursor:"pointer"}} onClick={()=>history.push('/')}>
                    <img src={"/images/disneylogo.png"} className="App-logo" alt="logo" />
                </Box>
                <Box width="900px">
                    <Typography variant="h4" className={classes.title}>
                        {props.title}
                    </Typography>
                </Box>
                <Box width="100px">
                    <IconButton>
                        <BasketModal/>
                    </IconButton>
                </Box>
            </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}