import { ActiveItem, HistoryItem } from "./item";

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
}