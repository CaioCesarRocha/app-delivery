import { Delivery } from "./delivery.entity";


export interface DeliveryRepositoryInterface{
    insert(delivery: Delivery): Promise<Delivery>;
    listAll(): Promise<Delivery[]>;
    listDeliverysClient(id_client: string): Promise<Delivery[]>;
    listDeliverysDeliveryman(id_deliveryman: string): Promise<Delivery[]>;
    listAllAvailable(page: number): Promise<Delivery[]>;
    searchDelivery(search: string): Promise<Delivery[]>;
    filterDelivery(filter:string): Promise<Delivery[]>;
    findOne(id: string): Promise<Delivery>;
    update(id: string, delivery: Delivery): Promise<Delivery>;
    delete(id: string): Promise<void>
}