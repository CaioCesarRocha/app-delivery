import { Client } from "@core/domain/client/client.entity";
import { ClientRepositoryInterface } from "@core/domain/client/client.repository";
import { HighlightSpanKind } from "typescript";

export class ClientInMemoryRepository implements ClientRepositoryInterface{
    clients: Client[] = [];

    async insert(client: Client): Promise<void> {
        this.clients.push(client);
    }
    
    async listAll(): Promise<Client[]> {
        return this.clients;
    }

    async findOne(id: string): Promise<Client> {
        const newListClients:Client[] = []
        this.clients.forEach((client) =>{
            if(client.id === id) newListClients.push(client)          
        })
        return newListClients[0]
    }

    async update(id: string, client: Client): Promise<void> {
        const newListClients:Client[] = []
        this.clients.forEach((client) =>{
            if(client.id !== id) newListClients.push(client)          
        })
        newListClients.push(client)
        this.clients = newListClients;
    }

    async delete(id: string): Promise<void> {
        const newListClients:Client[] = []
        this.clients.forEach((client) =>{
            if(client.id !== id) newListClients.push(client)          
        })
        this.clients = newListClients;
    }
}