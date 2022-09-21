import { ClientInMemoryRepository } from "../../infra/db/in-memory/client-in-memory.repository";
import { CreateClientUseCase } from "./create-client.use-case";
import { FindOneClientUseCase } from "./find-one-client.use-case";


describe('Testing FindOne Client UseCase', () =>{
    it('Should find one Client', async() =>{
        const repository = new ClientInMemoryRepository();
        const createNewClient = new CreateClientUseCase(repository)      
        const newClient = await createNewClient.execute({
            username: 'Silver',
            password: 'K1K2K3'
        });    
        const findOneClient = new FindOneClientUseCase(repository);
        const client = await findOneClient.execute(newClient.id)
   
        expect(client).toStrictEqual({
            id: newClient.id,
            username: newClient.username,
            password: newClient.password
        })
    })
})