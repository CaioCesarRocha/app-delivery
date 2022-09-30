import * as dotenv from 'dotenv'
import { DeliverymanRepositoryInterface } from '../../domain/devileryman/deliveryman.repository';
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
dotenv.config();

export class AuthenticateDeliverymanUseCase{
    constructor(private deliverymanRepo: DeliverymanRepositoryInterface){}
    
    async execute(input: AuthenticateDeliverymanInput): Promise<AuthenticateDeliverymanOutput>{
        const deliveryman = await this.deliverymanRepo.findByUsername(input.username);
        if(!deliveryman.username) throw new Error('Deliveryman not exist!');
        const passwordMatch = await compare(input.password, deliveryman.password);
        if(!passwordMatch) throw new Error('Password invalid!')
        const username = input.username
        const token = sign({username}, process.env.md5Hash,{ //criado usando o md5 hash generator(site)
            subject: deliveryman.id,
            expiresIn: "7d",
        }) 
        return{token: token};             
    }
}

type AuthenticateDeliverymanInput={
    username: string
    password: string;
}

type AuthenticateDeliverymanOutput={
    token: string;
}