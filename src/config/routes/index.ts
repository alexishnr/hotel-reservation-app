import Home from '../../views/Home';
import HotelHome from '../../views/HotelHome';
import Confirmation from '../../views/Confirmation';
import Room from '../../views/Room';
import {RouteProps} from "react-router";

interface Route {
	component: RouteProps['component'];
}

enum PathApp {
	home = '/',
	confirmation = '/confirmation',
	room = '/:hotelId/:roomId',
	hotel = '/:hotelId'
};

export const routes: { [key in PathApp]: Route }  = {
	[PathApp.home]: {
		component: Home,
	},
	[PathApp.room]: {
		component: Room,
	},
	[PathApp.confirmation]: {
		component: Confirmation,
	},
	[PathApp.hotel]: {
		component: HotelHome,
	}
}
