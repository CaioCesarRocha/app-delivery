import { Request, Response } from "express";
import { AuthenticateDeliveryman } from "./deliveryman.authentication";

export class AuthenticateDeliverymanController{
    async handle(request: Request, response: Response){
        const {username, password} = request.body;
        const authenticateDeliveryman = new AuthenticateDeliveryman()
        const resultAuthentication = await authenticateDeliveryman.execute({username, password});
        return response.json(resultAuthentication)
    }
}
