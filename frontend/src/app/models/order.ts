import { CountdownConfig } from "ngx-countdown";
import { ActiveItem, HistoryItem, MakeItem } from "./item";

export interface Order {
    id: number,
    item: ActiveItem,
    comment: string,
    address: string,
    creation: Date,
    delivery: Date,
    price: number,
    status: string
}

export interface OrderHistory {
    id: number,
    item: HistoryItem,
    comment: string,
    address: string,
    creation: Date,
    delivery: Date,
    price: number,
    status: string
}
export interface ActiveOrders {
    id: number,
    item: ActiveItem,
    comment: string,
    address: string,
    creation: Date,
    delivery: Date,
    price: number,
    status: string
    configCountDown: CountdownConfig,
}

export interface MakeOrder{
    comment: string,
    address: string,
    userId: number,
    salesmanId: number,
    item: MakeItem,
}

export interface CancelOrder{
    userId: number,
    orderId: number,
}