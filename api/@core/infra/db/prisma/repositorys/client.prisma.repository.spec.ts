import { ClientProps, Client } from "../../../../domain/client/client.entity";
import { ClientPrismaRepository } from "./client.prisma.repository";

describe('Testing Client Prisma Repository', () =>{
    it('Should Create a User', async() =>{      
        const clientProps:ClientProps = {
            username: 'Luffy',
            password: 'mygyara'
        }
        const client = await Client.create(clientProps)
        const repository = new ClientPrismaRepository();
        await repository.insert(client)
        const clientFound = await repository.findOne(client.id)

        expect(clientFound.toJSON()).toStrictEqual(client.toJSON())
    })
})