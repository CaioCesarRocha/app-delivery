import { ClientInMemoryRepository } from "../../infra/db/in-memory/client-in-memory.repository";
import { CreateClientUseCase } from "./create-client.use-case";
import { ListAllClientUseCase } from "./list-all-client.use-case";


describe('Testing List All Clients UseCases', () =>{
    it('Should List all clients ', async() =>{
        const repository = new ClientInMemoryRepository();
        const createNewClient = new CreateClientUseCase(repository)
        await createNewClient.execute({
            username: 'Silver',
            password: 'K1K2K3'
        });

        const findAllClients = new ListAllClientUseCase(repository)
        const response = await findAllClients.execute()

        expect(response).toHaveLength(1);
        expect(response[0].id).toEqual(repository.clients[0].id),
        expect(response[0].username).toEqual('Silver')
    })
})