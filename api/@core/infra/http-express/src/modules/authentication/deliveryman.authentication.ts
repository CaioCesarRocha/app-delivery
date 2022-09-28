import { prisma } from '../../../../db/prisma/prismaClient';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

interface IAuthenticateDeliveryman{
    username: string;
    password: string;
}

export class AuthenticateDeliveryman{
    async execute({username, password}: IAuthenticateDeliveryman){
        const deliveryman = await prisma.deliveryman.findFirst({where: {username: username}})
        if(!deliveryman) throw new Error('Deliveryman not exists')

        const passwordMatch = await compare(password, deliveryman.password);
        if(!passwordMatch) throw new Error('Password invalid!')
       
        const token = sign({username}, process.env.md5Hash,{ //criado usando o md5 hash generator(site)
            subject: deliveryman.id,
            expiresIn: "7d",
        }) 

        return token;
    }
}