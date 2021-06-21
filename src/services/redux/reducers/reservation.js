import { ADD_ROOM, DELETE_ROOM, DELETE_BASKET } from '../actions/actions';


const initialState = {
	basket: []
};

const hotel = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ADD_ROOM:
			// Check if there is already a room with the same url in the basket, if yes increase the quantity, if not add this room in the basket
			let basketToAdd = [...state.basket];
			let searchExisting = basketToAdd.find(room => room.url === payload.url);
			
			if (searchExisting) {
				searchExisting.quantity++;
			} else {
			 payload.quantity = 1;
			 basketToAdd.push(payload);
			}
			return {
				...state,
				basket: basketToAdd,
			};
			case DELETE_ROOM:
				console.log(payload.url );
				
			// Check if there is already a room with the same url in the basket, if yes decrease the quantity, if the quantity is equal to 1 delete this room from the basket
			let basketToDelete = [...state.basket];
			let searchExistingToDelete = basketToDelete.find(room => room.url === payload.url);
			
			if (searchExistingToDelete) {
				console.log(searchExistingToDelete);
				
				searchExistingToDelete.quantity--;
				if(searchExistingToDelete.quantity === 0) basketToDelete.splice(searchExistingToDelete,1)
			} 
			return {
				...state,
				basket: basketToDelete,
			};
			case DELETE_BASKET:
			// return a emty array to delete the basket after order confirmation
			return {
				...state,
				basket: [],
			};
		default:
			return state;
	}
};

export default hotel;
