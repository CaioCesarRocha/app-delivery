import { Delivery, LatLng, sizeItem, statusDelivery } from "../../../../domain/delivery/delivery.entity";
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

    async insert(delivery: Delivery): Promise<Delivery> {   
        const newDelivery = await prisma.delivery.create({data: delivery.toJSON()})
        const deliveryCreated = await this.normalizeDelivery(newDelivery)
        return deliveryCreated;
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
    async listAllAvailable(page: number): Promise<Delivery[]> {
        const listDeliverysAvailable: Delivery[] = []
        const deliverys = await prisma.delivery.findMany({
            skip: page,
            take: 5,
            where: {id_deliveryman: null}
        });   
        deliverys.map( async(delivery) => {
            const deliveryNormalized = await this.normalizeDelivery(delivery)
            listDeliverysAvailable.push(deliveryNormalized)
        })    
        return listDeliverysAvailable;
    }
    async searchDelivery(search: string): Promise<Delivery[]> {
        const listDeliverysSearched: Delivery[] = []
        const deliverys = await prisma.delivery.findMany({
            where: {
                name_item: {
                    contains: search,
                    mode: 'insensitive'
                },
            }
        });   
        deliverys.map( async(delivery) => {
            const deliveryNormalized = await this.normalizeDelivery(delivery)
            listDeliverysSearched.push(deliveryNormalized)
        })     
        return listDeliverysSearched;
    }
    async filterDelivery(filter: string): Promise<Delivery[]> {
        var yesterday = new Date(Date.now() - 86400000);
        const listDeliverysFilter: Delivery[] = []
        var deliverys = [];

        if(filter === 'date'){
            deliverys = await prisma.delivery.findMany({ 
                where: { created_at: {gte: yesterday, lte: new Date()}}                  
            });
        }else{
            deliverys = await prisma.delivery.findMany({
                where:{ OR: [
                    { status: filter },
                    { size_item: filter}
                ]},
            });   
        }
        
        deliverys.map( async(delivery) => {
            const deliveryNormalized = await this.normalizeDelivery(delivery)
            listDeliverysFilter.push(deliveryNormalized)
        })     
        return listDeliverysFilter;
    }
    async findOne(id: string): Promise<Delivery> {
        const delivery = await prisma.delivery.findFirst({where: { id: id}})
        const deliveryNormalized = await this.normalizeDelivery(delivery)
        return deliveryNormalized;
    }
    async update(id: string, delivery: Delivery): Promise<Delivery> {
        const deliveryUpdated = await prisma.delivery.update({
            data: delivery.toJSON(), 
            where: {id : id}
        })
        const normalizedDelivery = await this.normalizeDelivery(deliveryUpdated);
        return normalizedDelivery;
    }
    async delete(id: string): Promise<void> {
        await prisma.delivery.delete({where:{ id: id}})
    }
}