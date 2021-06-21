import {HotelModel, Rooms} from "../../hotel/models/HotelModel";
import { PaymentDataModel } from "../../hotel/models/PaymentDataModel";

export interface Store {
    hotel: {
        data: HotelModel[]
    };
    reservation: {
        basket: Rooms[]
    };
    order: {
        data:PaymentDataModel;
    }
}