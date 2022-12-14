import { ClientInMemoryRepository } from "../../infra/db/in-memory/client-in-memory.repository";
import { CreateClientUseCase } from "./create-client.use-case"


describe('Testing Create Client UseCases', () =>{
    it('Should Create a New Client', async() =>{
        const repository = new ClientInMemoryRepository();
        const createNewClient = new CreateClientUseCase(repository)

        const response = await createNewClient.execute({
            username: 'Silver',
            password: 'K1K2K3'
        });

        expect(repository.clients).toHaveLength(1);
        expect(response).toHaveProperty('id')       
        expect(response.username).toEqual('Silver')
    })
})