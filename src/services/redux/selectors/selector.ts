import {Store} from "../definitions"

export type Hotel = Pick<Store['hotel'], 'data'>;
export type Reservation = Pick<Store['reservation'], 'basket'>;
export type Order = Pick<Store['order'], 'data'>;

export const getHotelData = (state: Store): Hotel => state.hotel;
export const reservation = (state: Store): Reservation => state.reservation;
export const order = (state: Store): Order => state.order;