import { GET_HOTEL_DATA } from '../actions/actions';

const initialState = {
	data: []
};

const hotel = (state = initialState, action) => {
	// TODO - A compléter
	const { type, payload } = action;

	switch (type) {
		case GET_HOTEL_DATA:
			return {
				...state,
				data: payload,
			};
		default:
			return state;
	}
};

export default hotel;
