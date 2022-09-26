import { prisma } from '../../../../db/prisma/prismaClient';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

interface IAuthenticateClient{
    username: string;
    password: string;
}

export class AuthenticateClient{
    async execute({username, password}: IAuthenticateClient){
        const client = await prisma.client.findFirst({where: {username: username}})
        if(!client) throw new Error('Client not exists')

        const passwordMatch = await compare(password, client.password);
        if(!passwordMatch) throw new Error('Password invalid!')
       
        const token = sign({username}, process.env.md5Hash,{ //criado usando o md5 hash generator(site)
            subject: client.id,
            expiresIn: "7d",
        }) 

        return token;
    }
}