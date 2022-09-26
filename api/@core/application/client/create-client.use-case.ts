import { Client } from "../../domain/client/client.entity";
import { ClientRepositoryInterface } from "../../domain/client/client.repository";
import { hash } from "bcrypt";


export class CreateClientUseCase{
    constructor(private clientRepo: ClientRepositoryInterface){}

    async execute(input: CreateClientInput): Promise<CreateClientOutput>{
        const client = Client.create(input);
        const hashPassword = await hash(client.password, 10)
        client.updatePassword(hashPassword)
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