import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {reservation} from '../../services/redux/selectors/selector'
import { useSelector } from 'react-redux';
import { Rooms } from '../../hotel/models/HotelModel';
import { Box, IconButton, Typography } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import useBookARoom from '../../services/hooks/useBookARoom';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormikTextInput } from './FormikTextInput';
import { UserModel } from '../models/UserModel';
import Badge from '@material-ui/core/Badge';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import useSendPaymentData from '../../services/hooks/useSendPayment';
import { PaymentDataModel } from '../../hotel/models/PaymentDataModel';
import { useHistory } from 'react-router';
import { Store } from '../../services/redux/definitions';

// Build the validation schema to use with formik
const validationSchema = yup.object({
    email: yup
    .string()
    .max(70, 'form.validation.maxString70' as string)
    .email('validation.emailFormat' as string)
    .required('Veuillez entrer une adresse email valide' as string),
    name: yup
    .string()
    .max(30, 'form.validation.maxString30' as string)
    .required('Veuillez entrer votre nom' as string),
    firstname: yup
    .string()
    .max(30, 'form.validation.maxString30' as string)
    .required('Veuillez entrer votre prénom' as string),
    address: yup
    .string()
    .max(30, 'form.validation.maxString30' as string)
    .required('Veuillez entrer une adresse valide' as string),
});

const initialValues: UserModel = {
      name: '',
      firstname: '',
      email:'',
      address:''
}

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }),
)(Badge);

export default function BasketModal(props):JSX.Element {
  const [open, setOpen] = React.useState<boolean>(props.open);
  const {basket} = useSelector<Store, { basket: Rooms[] }>(reservation);

  const {deleteRoom} = useBookARoom()
  const {sendPaymentData, deleteBasket} = useSendPaymentData();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Render the total of the order
  const total =():string=>{
    let total = 0;
    basket.forEach((book:Rooms) => {
      if(book.quantity) total = total + parseInt(book.price) * book.quantity
    });
    return `Total : ${total.toString()}€`
  };

  // Build the payment confirmation data
  const handleSubmit=(data:UserModel)=>{
    let order:PaymentDataModel = {
      user :{
        name: data.name.toUpperCase(),
        firstname: data.firstname.toUpperCase(),
        email: data.email,
        address: data.address.toUpperCase()
      },
      order: basket
    }
    // Send the payment and after that delete the basket
    sendPaymentData(order).then(()=>{
      setOpen(false);
      deleteBasket();
      history.push('/confirmation');
    })
  };

  return (
    <div>
      <Box color="#FFF" onClick={handleClickOpen}>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={basket.length} color="secondary">
          <Box color="#FFF">
            <ShoppingCartIcon />
          </Box>
        </StyledBadge>
      </IconButton>
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Panier</DialogTitle>
        <DialogContent>
          {basket.length > 0 ?(
                <DialogContentText>
                    Découvrez votre panier et réservez vite votre prochain séjour chez Disney !
                </DialogContentText>
            ):(
            <DialogContentText>
                    Votre panier est vide.
            </DialogContentText>
            )}
            <Box marginTop="50px">
            {basket.length>0?(
                <DialogContentText>
                    Résumé
                </DialogContentText>):null}
                {
                basket.map((data:Rooms, i:number) => (
                  <Box display="flex" flexDirection="column" marginBottom="10px">
                    <Box display="flex" justifyContent="center" key={i}>
                        <Box display="flex">
                            <Typography>
                                {data.hotelName} - {data.roomName} - {data.price}€ x {data.quantity}
                            </Typography>
                            <Box onClick={()=>{deleteRoom(data)}} style={{cursor:"pointer"}}>
                                <DeleteOutlinedIcon />
                            </Box>
                    </Box>
                  </Box>
                  <Box height="1px" marginTop="10px" bgcolor="#b7b7b7"/>
                </Box>
                ))
                }
            </Box>
            {basket.length > 0 ?
            (
                <Box marginTop="50px">
                    <DialogContentText>
                        Informations de réservation
                    </DialogContentText>
                    <Formik<UserModel>
                    initialValues={initialValues}
                    onSubmit={(data)=>handleSubmit(data)}
                    validationSchema={validationSchema}> 
                    {({ isSubmitting }) => (
                        <Form noValidate={true} style={{ display: 'flex', flexDirection: 'column' }} autoComplete="off">
                            <FormikTextInput name="name" label={"Nom"} />
                            <FormikTextInput name="firstname" label={"Prénom"} />
                            <FormikTextInput name="email" label={"Email"} />
                            <FormikTextInput name="address" label={"Addresse"} />
                            <Box width="50%" marginTop="30px" display="flex" justifyContent="center" marginLeft="auto" marginRight="auto">
                                <Button color="primary" variant="outlined" fullWidth type="submit">
                                    Valider le paiement
                                </Button>
                            </Box>
                        </Form>
                    )}
                    </Formik>
                 </Box>
            ):null}
        </DialogContent>
        <DialogActions>
                  <Box display="flex" style={{cursor:"pointer"}} justifyContent="space-between" width="100%" alignItems="center">
                    <Box display="flex" onClick={handleClose} style={{cursor:"pointer"}}>
                      <Typography variant="h6" >
                      Annuler
                      </Typography>
                    </Box>
                    {basket.length>0? (
                    <Box display="flex" color="orange" style={{cursor:"pointer"}}>
                      <Typography variant="h6" >
                      {basket.length>0? total():null}
                      </Typography>
                    </Box>
                    ):null}
                  </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}