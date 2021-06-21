import {useCallback} from 'react';
import {ADD_ROOM, DELETE_ROOM} from '../redux/actions/actions'
import {useDispatch} from 'react-redux';
import { Rooms } from '../../hotel/models/HotelModel';

const useBookARoom = () => {  
  const dispatch = useDispatch()
  const addRoom = useCallback(async (data:Rooms) => {    
    try {
      if (data) {
        dispatch({
          type: ADD_ROOM,
          payload: data
        })        
      }
    } catch(error) {
    }
  }, [dispatch])
  const deleteRoom = useCallback(async (data:Rooms) => {    
    try {
      if (data) {
        dispatch({
          type: DELETE_ROOM,
          payload: data
        })        
      }
    } catch(error) {
    }
  }, [dispatch])
  return {
    addRoom,
    deleteRoom
  }
}
export default useBookARoom;