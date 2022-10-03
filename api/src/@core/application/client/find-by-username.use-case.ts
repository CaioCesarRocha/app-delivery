import { ClientRepositoryInterface } from "../../domain/client/client.repository";

export class FindClientByUsernameUseCase{
    constructor(private clientRepo: ClientRepositoryInterface){}
    async execute(username: string): Promise<FindByUsernameOutput | null>{
        const client = await this.clientRepo.findByUsername(username);
        if(client.props.username === undefined) return null;
        return client.toJSON();
    }
}

type FindByUsernameOutput={
    id: string;
    username: string;
    password: string;
}