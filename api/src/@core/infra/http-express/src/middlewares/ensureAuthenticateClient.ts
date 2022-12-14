import { NextFunction, Request, Response } from "express";
import * as dotenv from 'dotenv';
import { verify } from "jsonwebtoken";
dotenv.config();

interface IPayload{
    sub: string;
}

//validar que o Client está logado quando tentar fazer o Login
export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    //console.log('PASSEI ENSUREE')
    if(!authHeader) return response.status(401).json({message: "Token missing!"})

    //Tipo do token será Bearer 32939237293-7219729182, recebe 2 coisas:
    //[0] - Bearer
    //[1] - Token 32939237293-7219729182
    const [ ,token] = authHeader.split(" ")
   
    try{
        const { sub } = verify(token, process.env.md5Hash) as IPayload;
        request.id_client = sub;  
        return next();
    }catch(error){
        return response.status(401).json({message: "Invalid Token!"})
    }

    //faço login, passa, gera o token
    //coloco o token na hora de fazer o post
    //recebe o token, verifica utlizando o md5hash
    //e devolve o id correpondente ao token (id errado! inexistente!)
    //por ser inexistente causa o erro na hora de salvar o dado no banco
}