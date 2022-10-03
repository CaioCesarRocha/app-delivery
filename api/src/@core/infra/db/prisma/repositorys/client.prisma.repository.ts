import { Client } from "../../../../domain/client/client.entity";
import { ClientRepositoryInterface } from "../../../../domain/client/client.repository";
import { prisma } from "../prismaClient";

export class ClientPrismaRepository implements ClientRepositoryInterface{ 
    constructor(){}

    async insert(client: Client): Promise<void> {
        await prisma.client.create({data: client.toJSON()})
    }
    async listAll(): Promise<Client[]> {
        const listClients: Client[] = []
        const clients = await prisma.client.findMany();
        clients.map(client => {
            listClients.push(Client.create(client))
        })
        return listClients;
    } 
    async findByUsername(username: string): Promise<Client> {
        const client = await prisma.client.findUnique({where: {username : username}})
        const normalizedClient = {
            id: client?.id,
            username: client?.username,
            password: client?.password 
        }      
        return Client.create(normalizedClient)
    }   
    async findOne(id: string): Promise<Client> {
        const client = await prisma.client.findUnique({where: {id : id}})
        const normalizedClient = {
            id: client.id,
            username: client.username,
            password: client.password
        }
        return Client.create(normalizedClient)
    }
    async update(id: string, client: Client): Promise<void> {
        await prisma.client.update({
            data: client.toJSON(), 
            where: {id : id}
        })
    }
    async delete(id: string): Promise<void> {
        await prisma.client.delete({where: {id: id}})
    }
}