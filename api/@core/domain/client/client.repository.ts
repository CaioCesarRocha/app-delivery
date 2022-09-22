import { Client } from "./client.entity";

export type ClientDTO = {
    id: string;
    username: string;
    password: string;
}


export interface ClientRepositoryInterface{
    insert(client: Client): Promise<void>;
    listAll(): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
    update(id: string, client: Client): Promise<void>;
    delete(id: string): Promise<void>
}