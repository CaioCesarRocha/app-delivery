import * as dotenv from 'dotenv'
import { ClientRepositoryInterface } from "../../domain/client/client.repository";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
dotenv.config();

export class AuthenticateClientUseCase{
    constructor(private clientRepo: ClientRepositoryInterface){}
    
    async execute(input: AuthenticateClientInput): Promise<AuthenticateClientOutput>{
        const client = await this.clientRepo.findByUsername(input.username);
        if(!client.username) throw new Error('Client not exist!');
        const passwordMatch = await compare(input.password, client.password);
        if(!passwordMatch) throw new Error('Password invalid!')
        const username = input.username
        const token = sign({username}, process.env.md5Hash,{ //criado usando o md5 hash generator(site)
            subject: client.id,
            expiresIn: "7d",
        }) 
        return{token: token};             
    }
}

type AuthenticateClientInput={
    username: string
    password: string;
}

type AuthenticateClientOutput={
    token: string;
}