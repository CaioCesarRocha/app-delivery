import { ClientInMemoryRepository } from "../../infra/db/in-memory/client-in-memory.repository";
import { CreateClientUseCase } from "../client/create-client.use-case";
import { AuthenticateClientUseCase } from "./authenticate-client.use-case";

describe('Testing Authenticate Client UseCase', () =>{
    it('Should Authentica a Client', async() =>{
        const newClient={
            username: 'Silver',
            password: 'K1K2K3'
        }
        const repository = new ClientInMemoryRepository();
        const createNewClient = new CreateClientUseCase(repository)      
        await createNewClient.execute(newClient);    

        const authenticateClient = new AuthenticateClientUseCase(repository);
        const client = await authenticateClient.execute(newClient)
        
        expect(client).toHaveProperty('token')
    })
})