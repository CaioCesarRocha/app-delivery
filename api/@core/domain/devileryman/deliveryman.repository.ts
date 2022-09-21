import { Deliveryman } from "./deliveryman.entity";


export interface DeliverymanRepositoryInterface{
    insert(deliverymand: Deliveryman): Promise<void>;
    listAll(): Promise<Deliveryman[]>;
    findOne(id: string): Promise<Deliveryman>;
    update(id: string, deliveryman: Deliveryman): Promise<void>;
    delete(id: string): Promise<void>
}