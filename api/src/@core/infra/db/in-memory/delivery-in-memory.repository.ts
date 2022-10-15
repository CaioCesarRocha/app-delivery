import { Delivery } from "../../../domain/delivery/delivery.entity";
import { DeliveryRepositoryInterface } from "../../../domain/delivery/delivery.repository";

export class DeliveryInMemoryRepository implements DeliveryRepositoryInterface{
    deliverys: Delivery[] = [];

    async insert(client: Delivery): Promise<void> {
        this.deliverys.push(client);
    }

    async listAll(): Promise<Delivery[]> {
        return this.deliverys;
    }

    async listDeliverysClient(id_client: string): Promise<Delivery[]> {
        const deliverysClient:Delivery[] = []
        this.deliverys.forEach((delivery) =>{
            if(delivery.props.id_client === id_client) deliverysClient.push(delivery);          
        })
        return deliverysClient;
    }

    async listDeliverysDeliveryman(id_deliveryman: string): Promise<Delivery[]> {
        const deliverysDeliveryman:Delivery[] = []
        this.deliverys.forEach((delivery) =>{
            if(delivery.props.id_deliveryman === id_deliveryman) deliverysDeliveryman.push(delivery);          
        })
        return deliverysDeliveryman;
    }

    async listAllAvailable(): Promise<Delivery[]> {
        const deliverysAvaliable:Delivery[] = []
        this.deliverys.forEach((delivery) =>{
            if(delivery.props.id_deliveryman === undefined) deliverysAvaliable.push(delivery);          
        })
        return deliverysAvaliable;
    }

    async searchDelivery(search: string): Promise<Delivery[]> {
        const deliverysSearched:Delivery[] = []
        this.deliverys.forEach((delivery) =>{
            if(delivery.props.name_item === search) deliverysSearched.push(delivery);          
        })
        return deliverysSearched;
    }

    async filterDelivery(filter: string): Promise<Delivery[]> {
        const deliverysFiltered:Delivery[] = []
        this.deliverys.forEach((delivery) =>{
            if(delivery.props.status === filter || delivery.props.size_item === filter) deliverysFiltered.push(delivery);          
        })
        return deliverysFiltered;
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