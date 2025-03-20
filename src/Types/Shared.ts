export enum DeliveryMethod {
    Nothing= "",
    Pickup = "Pickup",
    Courier = "Courier",
    RussiaPost = "RussiaPost"
}

export enum PaymentType {
    Nothing = "",
    Cash = "Cash",
    Card = "Card",
}

export interface IOrderForm {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    deliveryMethod: DeliveryMethod;
    paymentType: PaymentType
}