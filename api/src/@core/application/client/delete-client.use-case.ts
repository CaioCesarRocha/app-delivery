import { ClientRepositoryInterface } from "../../domain/client/client.repository";


export class DeleteClientUseCase{
    constructor(private clientRepo:ClientRepositoryInterface){}

    async execute(id: string): Promise<void>{
        await this.clientRepo.delete(id);
    }
}

