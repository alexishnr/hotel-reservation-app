import {useCallback} from 'react';
import {GET_PAYMENT_DATA, DELETE_BASKET} from '../redux/actions/actions'
import {useDispatch} from 'react-redux';
import { PaymentDataModel } from '../../hotel/models/PaymentDataModel';

const useSendPaymentData = () => {  
  const dispatch = useDispatch()

  const sendPaymentData = useCallback(async (data:PaymentDataModel) => {    
    try {
      if (data) { 
        dispatch({
          type: GET_PAYMENT_DATA,
          payload: data
        })        
      }
    } catch(error) {
    }
  }, [dispatch])
  const deleteBasket = useCallback(async () => {    
    try {
        dispatch({
          type: DELETE_BASKET
        })        
    } catch(error) {
    }
  }, [dispatch])
  return {
    sendPaymentData,
    deleteBasket
  }
}
export default useSendPaymentData;