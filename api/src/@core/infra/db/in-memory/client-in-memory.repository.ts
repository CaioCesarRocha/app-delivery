import { Client } from "../../../domain/client/client.entity";
import { ClientRepositoryInterface } from "../../../domain/client/client.repository";


export class ClientInMemoryRepository implements ClientRepositoryInterface{
    clients: Client[] = [];

    async insert(client: Client): Promise<void> {
        this.clients.push(client);
    }
    
    async listAll(): Promise<Client[]> {
        return this.clients;
    }

    async findByUsername(username: string): Promise<Client> {
        const listClients:Client[] = []
        this.clients.forEach((client) =>{
            if(client.props.username === username) listClients.push(client)          
        })
        return listClients[0]
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