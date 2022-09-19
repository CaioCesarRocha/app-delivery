import { ClientRepositoryInterface } from "@core/domain/client/client.repository";

export class FindAllClientUseCase{
    constructor(private clientRepo: ClientRepositoryInterface){}

    async execute():Promise<FindAllClientOutput>{
        const clients = await this.clientRepo.findAll()
        return clients.map(client => client.toJSON())
    }
}

type FindAllClientOutput={
    id: string;
    username: string;
    password: string;
}[];