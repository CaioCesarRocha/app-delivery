import { Client } from "../../domain/client/client.entity";
import { ClientRepositoryInterface } from "../../domain/client/client.repository";


export class UpdateClientUseCase{
    constructor(private clientRepo: ClientRepositoryInterface){}

    async execute(id: string, input: UpdateClientInput): Promise<UpdateClientOutput>{
        const client = Client.create(input, id);
        await this.clientRepo.update(id, client)
        return client.toJSON();
    }
}

type UpdateClientInput={
    id: string;
    username: string;
    password: string; 
}

type UpdateClientOutput={
    id: string;
    username: string;
    password: string;
}