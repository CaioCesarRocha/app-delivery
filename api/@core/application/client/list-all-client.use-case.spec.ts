import { ClientInMemoryRepository } from "../../infra/db/in-memory/client/client-in-memory.repository";
import { CreateClientUseCase } from "./create-client.use-case"
import { FindAllClientUseCase } from "./list-all-client.use-case";


describe('Testing List All Clients UseCases', () =>{
    it('Should List all clients ', async() =>{
        const repository = new ClientInMemoryRepository();
        const createNewClient = new CreateClientUseCase(repository)
        await createNewClient.execute({
            username: 'Silver',
            password: 'K1K2K3'
        });

        const findAllClients = new FindAllClientUseCase(repository)
        const response = await findAllClients.execute()

        expect(response).toHaveLength(1);
        expect(response[0]).toStrictEqual({
            id: response[0].id,
            username: 'Silver',
            password: 'K1K2K3'
        })
    })
})