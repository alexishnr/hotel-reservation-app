import { UserModel } from "../../order/models/UserModel";
import { Rooms } from "./HotelModel";

export interface PaymentDataModel {
    user:UserModel;
    order: Rooms[];
}


