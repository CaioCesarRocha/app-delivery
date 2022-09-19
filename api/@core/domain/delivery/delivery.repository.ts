import { Delivery } from "./delivery.entity";


export interface DeliveryRepositoryInterface{
    insert(delivery: Delivery): Promise<void>;
    findAll(): Promise<Delivery[]>;
    //findOne(id: string): Promise<Client>;
    //update(id: string, client: Client): Promise<void>;
    //delete(id: string): Promise<void>
}