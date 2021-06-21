interface Hotel {
    hotelName: string;
    url: string;
    img:string;
    summary:string;
}

export interface HotelModel extends Hotel {
    place: string;
    rooms: Rooms[]
}

export interface Rooms extends Hotel {
    roomName: string;
    price: string;
    hotelUrl:string;
    quantity?: number
}
