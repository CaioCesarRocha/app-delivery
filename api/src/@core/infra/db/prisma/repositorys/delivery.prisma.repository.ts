import { Delivery, DeliveryProps, LatLng, sizeItem, statusDelivery } from "../../../../domain/delivery/delivery.entity";
import { DeliveryRepositoryInterface } from "../../../../domain/delivery/delivery.repository";
import { prisma } from "../prismaClient";


export class DeliveryPrismaRepository implements DeliveryRepositoryInterface{
    async normalizeDelivery(delivery){
        const deliveryNormalized = Delivery.create({
            id_client: delivery.id_client,
            id_deliveryman: delivery.id_deliveryman,
            name_item: delivery.name_item,
            size_item: delivery.size_item as sizeItem,
            startPosition: delivery.startPosition as LatLng,
            endPosition: delivery.endPosition as LatLng,
            status: delivery.status as statusDelivery,
            price: delivery.price,
            created_at: delivery.created_at as Date,
            end_at: delivery.end_at as Date
        }, delivery.id)
        return deliveryNormalized
    }

    async insert(delivery: Delivery): Promise<void> {   
        await prisma.delivery.create({data: delivery.toJSON()})
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
    async listDeliverysClient(id_client: string): Promise<Delivery[]> {
        const listDeliverysClient: Delivery[] = []
        const deliverys = await prisma.delivery.findMany({where: {id_client: id_client}});     
        deliverys.map( async(delivery) => {
            const deliveryNormalized = await this.normalizeDelivery(delivery)
            listDeliverysClient.push(deliveryNormalized)
        })     
        return listDeliverysClient;
    }
    async listDeliverysDeliveryman(id_deliveryman: string): Promise<Delivery[]> {
        const listDeliverysDeliveryman: Delivery[] = []
        const deliverys = await prisma.delivery.findMany({where: {id_deliveryman: id_deliveryman}});     
        deliverys.map( async(delivery) => {
            const deliveryNormalized = await this.normalizeDelivery(delivery)
            listDeliverysDeliveryman.push(deliveryNormalized)
        })     
        return listDeliverysDeliveryman;
    }
    async listAllAvailable(): Promise<Delivery[]> {
        const listDeliverysAvailable: Delivery[] = []
        const deliverys = await prisma.delivery.findMany({where: {id_deliveryman: null}});     
        deliverys.map( async(delivery) => {
            const deliveryNormalized = await this.normalizeDelivery(delivery)
            listDeliverysAvailable.push(deliveryNormalized)
        })     
        return listDeliverysAvailable;
    }
    async findOne(id: string): Promise<Delivery> {
        const delivery = await prisma.delivery.findFirst({where: { id: id}})
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