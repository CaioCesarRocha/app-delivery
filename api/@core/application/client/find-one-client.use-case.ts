import { ClientRepositoryInterface } from "@core/domain/client/client.repository";


export class FindOneClientUseCase{
    constructor(private clientRepo: ClientRepositoryInterface){}
    async execute(id: string): Promise<FindOneClientOutput>{
        const client = await this.clientRepo.findOne(id);
        return client.toJSON();
    }
}

type FindOneClientOutput={
    id: string;
    username: string;
    password: string;
}