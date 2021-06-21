import { GET_PAYMENT_DATA } from '../actions/actions';

const initialState = {
	data: []
};

const order = (state = initialState, action) => {
	// TODO - A compléter
	const { type, payload } = action;

	switch (type) {
		case GET_PAYMENT_DATA:
			return {
				...state,
				data: payload,
			};
		default:
			return state;
	}
};

export default order;
