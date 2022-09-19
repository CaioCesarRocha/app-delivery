import {Client, ClientProps} from './client.entity';

describe('Testing Client Entity', () =>{      
    it('testing constructor',() =>{
        const clientProps: ClientProps ={
            username: 'Silver',
            password: '12345'
        }
        const newClient = Client.create(clientProps)
        expect(newClient.id).toBeDefined()
        expect(newClient.props).toStrictEqual(clientProps)
    })

    it('Testing Update Username',() =>{
        const clientProps: ClientProps ={
            username: 'Silver',
            password: '12345'
        }
        const newClient = Client.create(clientProps)
        newClient.updateUsername('Scopper')
        expect(newClient.id).toBeDefined()
        expect(newClient.username).toBe('Scopper')
    })
})