import { Delivery } from "@core/domain/delivery/delivery.entity";
import { DeliveryRepositoryInterface } from "@core/domain/delivery/delivery.repository";

export class DeliveryInMemoryRepository implements DeliveryRepositoryInterface{
    deliverys: Delivery[] = [];

    async insert(client: Delivery): Promise<void> {
        this.deliverys.push(client);
    }
    async findAll(): Promise<Delivery[]> {
        return this.deliverys;
    }
}