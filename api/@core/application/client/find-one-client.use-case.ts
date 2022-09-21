import { ClientRepositoryInterface } from "@core/domain/client/client.repository";


export class FindOneClientUseCase{
    constructor(private clientRepo: ClientRepositoryInterface){}
    async execute(id: string): Promise<FindOneClientOutput>{
        const route = await this.clientRepo.findOne(id);
        return route.toJSON();
    }
}

type FindOneClientOutput={
    id: string;
    username: string;
    password: string;
}