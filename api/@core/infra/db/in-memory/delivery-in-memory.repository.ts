import { Delivery } from "@core/domain/delivery/delivery.entity";
import { DeliveryRepositoryInterface } from "@core/domain/delivery/delivery.repository";

export class DeliveryInMemoryRepository implements DeliveryRepositoryInterface{
    deliverys: Delivery[] = [];

    async insert(client: Delivery): Promise<void> {
        this.deliverys.push(client);
    }

    async listAll(): Promise<Delivery[]> {
        return this.deliverys;
    }

    async findOne(id: string): Promise<Delivery> {
        const newListDeliverys:Delivery[] = []
        this.deliverys.forEach((delivery) =>{
            if(delivery.id === id) newListDeliverys.push(delivery)          
        })
        return newListDeliverys[0]
    }

    async update(id: string, delivery: Delivery): Promise<void> {
        const newListDeliverys:Delivery[] = []
        this.deliverys.forEach((delivery) =>{
            if(delivery.id !== id) newListDeliverys.push(delivery)          
        })
        newListDeliverys.push(delivery)
        this.deliverys = newListDeliverys;
    }
    
    async delete(id: string): Promise<void> {
        const newListDeliverys:Delivery[] = []
        this.deliverys.forEach((delivery) =>{
            if(delivery.id !== id) newListDeliverys.push(delivery)          
        })
        this.deliverys = newListDeliverys;
    }
}