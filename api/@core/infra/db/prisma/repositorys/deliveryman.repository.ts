import { Deliveryman } from "../../../../domain/devileryman/deliveryman.entity";
import { DeliverymanRepositoryInterface } from "../../../../domain/devileryman/deliveryman.repository";
import { prisma } from "../prismaClient";

export class DeliverymanPrismaRepository implements DeliverymanRepositoryInterface{ 
    constructor(){}

    async insert(deliveryman: Deliveryman): Promise<void> {
        await prisma.deliveryman.create({data: deliveryman.toJSON()})
    }
    async listAll(): Promise<Deliveryman[]> {
        const listDeliverymen: Deliveryman[] = []
        const deliveryman = await prisma.deliveryman.findMany();
        deliveryman.map(deliveryman => {
            listDeliverymen.push(Deliveryman.create(deliveryman))
        })
        return listDeliverymen;
    }
    async findByUsername(username: string): Promise<Deliveryman> {
        const deliveryman = await prisma.deliveryman.findUnique({where: {username : username}})
        const normalizedDeliveryman = {
            id: deliveryman?.id,
            username: deliveryman?.username,
            password: deliveryman?.password 
        }      
        return Deliveryman.create(normalizedDeliveryman)
    }    
    async findOne(id: string): Promise<Deliveryman> {
        const deliveryman = await prisma.deliveryman.findUnique({where: {id : id}})
        const normalizedDeliveryman = {
            id: deliveryman.id,
            username: deliveryman.username,
            password: deliveryman.password
        }
        return Deliveryman.create(normalizedDeliveryman)
    }
    async update(id: string, deliveryman: Deliveryman): Promise<void> {
        await prisma.deliveryman.update({
            data: deliveryman.toJSON(), 
            where: {id : id}
        })
    }
    async delete(id: string): Promise<void> {
        await prisma.deliveryman.delete({where: {id: id}})
    }
}