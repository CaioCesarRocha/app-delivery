import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string;
}

@Injectable()
export class EnsureAuthenticateClientMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if(!authHeader) throw new BadRequestException('Token missing!');   
    //Tipo do token será Bearer 32939237293-7219729182, recebe 2 coisas:
    //[0] - Bearer
    //[1] - Token 32939237293-7219729182
    const [ ,token] = authHeader.split(" ")  
    try{
      const { sub } = verify(token, process.env.md5Hash) as IPayload;
      req.body['id_client'] = sub 
      return next();
    }catch(error){
      throw new BadRequestException('Token inválid!');
    }
    //faço login, passa, gera o token
    //coloco o token na hora de fazer o post
    //recebe o token, verifica utlizando o md5hash
    //e devolve o id correpondente ao token (id errado! inexistente!)
    //por ser inexistente causa o erro na hora de salvar o dado no banco
  }
}
