import { Deliveryman } from "../../../domain/devileryman/deliveryman.entity";
import { DeliverymanRepositoryInterface } from "../../../domain/devileryman/deliveryman.repository";

export class DeliverymanInMemoryRepository implements DeliverymanRepositoryInterface{
    deliverymen: Deliveryman[] = [];

    async insert(client: Deliveryman): Promise<void> {
        this.deliverymen.push(client);
    }

    async listAll(): Promise<Deliveryman[]> {
        return this.deliverymen;
    }

    async findOne(id: string): Promise<Deliveryman> {
        const newListDeliverymen:Deliveryman[] = []
        this.deliverymen.forEach((deliveryman) =>{
            if(deliveryman.id === id) newListDeliverymen.push(deliveryman)          
        })
        return newListDeliverymen[0]

    }

    async update(id: string, deliveryman: Deliveryman): Promise<void> {
        const newListDeliverymen:Deliveryman[] = []
        this.deliverymen.forEach((deliveryman) =>{
            if(deliveryman.id !== id) newListDeliverymen.push(deliveryman)          
        })
        newListDeliverymen.push(deliveryman)
        this.deliverymen = newListDeliverymen;
    }
    
    async delete(id: string): Promise<void> {
        const newListDeliverymen:Deliveryman[] = []
        this.deliverymen.forEach((deliveryman) =>{
            if(deliveryman.id !== id) newListDeliverymen.push(deliveryman)          
        })
        this.deliverymen = newListDeliverymen;
    }
}