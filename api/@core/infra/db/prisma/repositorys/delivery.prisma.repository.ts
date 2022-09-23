import { Delivery, DeliveryProps, LatLng, sizeItem, statusDelivery } from "../../../../domain/delivery/delivery.entity";
import { DeliveryRepositoryInterface } from "../../../../domain/delivery/delivery.repository";
import { prisma } from "../prismaClient";


export class DeliveryPrismaRepository implements DeliveryRepositoryInterface{
    async normalizeDelivery(delivery){
        const deliveryNormalized = Delivery.create({
            id_client: delivery.props.id_client,
            id_deliveryman: delivery.props.id_deliveryman,
            name_item: delivery.name_item,
            size_item: delivery.size_item as sizeItem,
            startPosition: delivery.startPosition as LatLng,
            endPosition: delivery.endPosition as LatLng,
            status: delivery.status as statusDelivery,
            price: delivery.props.price
        })
        return deliveryNormalized
    }

    async insert(delivery: Delivery): Promise<void> {
        await prisma.delivery.create({data: delivery.toJSON()})
        await prisma.delivery.create({data: {
            id: delivery.id,
            id_client: delivery.props.id_client,
            id_deliveryman: delivery.props.id_deliveryman,
            name_item: delivery.name_item,
            size_item: delivery.size_item,
            startPosition: delivery.startPosition,
            endPosition: delivery.endPosition,
            status: delivery.status,
            price: delivery.props.price
        }})
    }
    async listAll(): Promise<Delivery[]> {
        const listDeliverys: Delivery[] = []
        const deliverys = await prisma.delivery.findMany();
        deliverys.map( async(delivery) => {
            const deliveryNormalized = await this.normalizeDelivery(delivery)
            listDeliverys.push(deliveryNormalized)
        })
        return listDeliverys;
    }
    async findOne(id: string): Promise<Delivery> {
        let delivery = await prisma.delivery.findUnique({where: { id: id}})
        const deliveryNormalized = await this.normalizeDelivery(delivery)
        return deliveryNormalized;
    }
    async update(id: string, delivery: Delivery): Promise<void> {
        await prisma.delivery.update({
            data: delivery.toJSON(), 
            where: {id : id}
        })
    }
    async delete(id: string): Promise<void> {
        await prisma.delivery.delete({where:{ id: id}})
    }
}