import { Delivery } from "./delivery.entity";


export interface DeliveryRepositoryInterface{
    insert(delivery: Delivery): Promise<void>;
    listAll(): Promise<Delivery[]>;
    listDeliverysClient(id_client: string): Promise<Delivery[]>;
    listDeliverysDeliveryman(id_deliveryman: string): Promise<Delivery[]>;
    listAllAvailable(): Promise<Delivery[]>;
    searchDelivery(search: string): Promise<Delivery[]>;
    filterDelivery(filter:string): Promise<Delivery[]>;
    findOne(id: string): Promise<Delivery>;
    update(id: string, delivery: Delivery): Promise<void>;
    delete(id: string): Promise<void>
}