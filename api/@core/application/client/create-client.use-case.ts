import { Client } from "../../domain/client/client.entity";
import { ClientRepositoryInterface } from "../../domain/client/client.repository";


export class CreateClientUseCase{
    constructor(private clientRepo: ClientRepositoryInterface){}

    async execute(input: CreateClientInput): Promise<CreateClientOutput>{
        const client = Client.create(input);
        await this.clientRepo.insert(client);
        return client.toJSON();
    }
}

type CreateClientInput={
    username: string;
    password: string;
}

type CreateClientOutput={
    id: string;
    username: string;
    password: string;
}