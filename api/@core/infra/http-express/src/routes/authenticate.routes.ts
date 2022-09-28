import { Router, Request, Response, NextFunction} from "express";

import { AuthenticateClientController } from "../modules/authentication/client.authentication.controller";
import { AuthenticateClient} from "../modules/authentication/client.authentication";
import { AuthenticateDeliveryman } from "../modules/authentication/deliveryman.authentication";

const authenticateRoutes = Router();
//const authenticateClientController = new AuthenticateClientController()

authenticateRoutes.post('/client/authenticate', async(request: Request, response: Response) =>{
    const {username, password} = request.body;
    const authenticateClient = new AuthenticateClient()
    const resultAuthentication = await authenticateClient.execute({username, password});
    return response.json(resultAuthentication)
})

authenticateRoutes.post('/deliveryman/authenticate', async(request: Request, response: Response) =>{
    const {username, password} = request.body;
    const authenticateDeliveryman = new AuthenticateDeliveryman()
    const resultAuthentication = await authenticateDeliveryman.execute({username, password});
    return response.json(resultAuthentication)
})

export { authenticateRoutes}

