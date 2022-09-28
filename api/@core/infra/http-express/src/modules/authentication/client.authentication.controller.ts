import { Request, Response } from "express";
import { AuthenticateClient } from "./client.authentication";

export class AuthenticateClientController{
    async handle(request: Request, response: Response){
        const {username, password} = request.body;
        const authenticateClient = new AuthenticateClient()
        const resultAuthentication = await authenticateClient.execute({username, password});
        return response.json(resultAuthentication)
    }
}
