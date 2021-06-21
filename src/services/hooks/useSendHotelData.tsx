import {useCallback} from 'react';
import {GET_HOTEL_DATA} from '../redux/actions/actions'
import {useDispatch} from 'react-redux';
import {HotelData} from "../../config/data/data";

const useSendHotelData = () => {
  const dispatch = useDispatch()
  const sendHotelData = useCallback( () => {
    try {
        dispatch({
          type: GET_HOTEL_DATA,
          payload: HotelData
        })
    } catch(error) {
    }
  }, [dispatch])
  return {
    sendHotelData
  }
}
export default useSendHotelData;