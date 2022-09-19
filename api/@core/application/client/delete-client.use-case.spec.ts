import { ClientInMemoryRepository } from "../../infra/db/in-memory/client/client-in-memory.repository";
import { DeleteClientUseCase } from "./delete-client.use-case";
import { CreateClientUseCase } from "./create-client.use-case"

describe('Testing Delete Client UseCase', () =>{
    it('Should Delete a Client', async() =>{
        const repository = new ClientInMemoryRepository();
        const createNewClient = new CreateClientUseCase(repository)      
        const newClient = await createNewClient.execute({
            username: 'Silver',
            password: 'K1K2K3'
        });    
        const deleteClient = new DeleteClientUseCase(repository);
        await deleteClient.execute(newClient.id)
    
        expect(repository.clients).toHaveLength(0);
    })
})