import { Router, Request, Response, NextFunction} from "express";
import { AuthenticateClientController } from "../modules/authentication/authenticate.client.controller";
import { AuthenticateClient } from "../modules/authentication/client.authentication";

const authenticateRoutes = Router();
//const authenticateClientController = new AuthenticateClientController()

authenticateRoutes.post('/authenticateClient', async(request: Request, response: Response) =>{
    const {username, password} = request.body;
    const authenticateClient = new AuthenticateClient()
    const resultAuthentication = await authenticateClient.execute({username, password});
    return response.json(resultAuthentication)
})

export { authenticateRoutes}

