import { combineReducers } from 'redux';
import hotel from './reducers/hotel';
import reservation from './reducers/reservation';
import order from './reducers/order';

export default combineReducers({
	hotel,
	reservation,
	order
});
