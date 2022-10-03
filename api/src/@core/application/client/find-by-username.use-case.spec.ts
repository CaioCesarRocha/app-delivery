import { ClientInMemoryRepository } from "../../infra/db/in-memory/client-in-memory.repository";
import { CreateClientUseCase } from "./create-client.use-case";
import { FindClientByUsernameUseCase } from "./find-by-username.use-case";


describe('Testing Find By Username Client UseCase', () =>{
    it('Should find By Username Client', async() =>{
        const repository = new ClientInMemoryRepository();
        const createNewClient = new CreateClientUseCase(repository)      
        const newClient = await createNewClient.execute({
            username: 'Silver',
            password: 'K1K2K3'
        });    
        const findOneClient = new FindClientByUsernameUseCase(repository);
        const client = await findOneClient.execute(newClient.username)
   
        expect(client).toStrictEqual({
            id: newClient.id,
            username: newClient.username,
            password: newClient.password
        })
    })
})