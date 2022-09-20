import { Delivery } from "./delivery.entity";


export interface DeliveryRepositoryInterface{
    insert(delivery: Delivery): Promise<void>;
    listAll(): Promise<Delivery[]>;
    //findOne(id: string): Promise<Client>;
    update(id: string, delivery: Delivery): Promise<void>;
    delete(id: string): Promise<void>
}