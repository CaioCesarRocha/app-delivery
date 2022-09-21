import { ClientInMemoryRepository } from "../../infra/db/in-memory/client-in-memory.repository";
import { CreateClientUseCase } from "./create-client.use-case"
import { UpdateClientUseCase } from "./update-client.use-case";


describe('Testing Update Client UseCase', () =>{
    it('Should Update a Client', async() =>{
        const repository = new ClientInMemoryRepository();
        const createNewClient = new CreateClientUseCase(repository)      
        const newClient = await createNewClient.execute({
            username: 'Silver',
            password: 'K1K2K3'
        });    
        const updateClient = new UpdateClientUseCase(repository);
        newClient.username = 'Golden'
        const response = await updateClient.execute(newClient.id, newClient)
    
        expect(repository.clients).toHaveLength(1);
        expect(response).toStrictEqual({
            id: repository.clients[0].id,
            username: 'Golden',
            password: newClient.password
        })
    })
})