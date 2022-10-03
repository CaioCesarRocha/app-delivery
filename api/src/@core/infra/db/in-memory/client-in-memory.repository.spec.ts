import { ClientInMemoryRepository } from "./client-in-memory.repository";
import { Client, ClientProps } from "../../../domain/client/client.entity";

describe('ClientInMemoryRepository', () =>{
    it('Should insert a new Client', async() =>{
        const repository = new ClientInMemoryRepository();

        let clientProps: ClientProps ={
            username: 'Silver',
            password: 'K1K2K3'
        }

        const client = Client.create(clientProps);
        await repository.insert(client)
        expect(repository.clients).toHaveLength(1)
        expect(repository.clients).toStrictEqual([client])
    })
})