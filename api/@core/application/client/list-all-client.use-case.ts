import { ClientRepositoryInterface } from "@core/domain/client/client.repository";

export class ListAllClientUseCase{
    constructor(private clientRepo: ClientRepositoryInterface){}

    async execute():Promise<ListAllClientOutput>{
        const clients = await this.clientRepo.listAll()  
        return clients.map(client => client.toJSON())
    }
}

type ListAllClientOutput={
    id: string;
    username: string;
    password: string;
}[];