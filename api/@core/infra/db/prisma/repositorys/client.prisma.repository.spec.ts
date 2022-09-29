import { ClientProps, Client } from "../../../../domain/client/client.entity";
import { ClientPrismaRepository } from "./client.prisma.repository";

describe('Testing Client Prisma Repository', () =>{
    it('Should Create a User', async() =>{      
        const clientProps:ClientProps = {
            username: 'Joao Carlos',
            password: '12345'
        }
        const client = await Client.create(clientProps)
        const repository = new ClientPrismaRepository();
        await repository.insert(client)
        let response = await repository.findOne(client.id)
        const clientFound = response.toJSON()

        expect(clientFound.id).toEqual(client.id);
        expect(clientFound.username).toEqual('Joao Carlos')
    })
})