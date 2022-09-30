import { Router, Request, Response} from "express";
import { ClientPrismaRepository } from "../../../db/prisma/repositorys/client.prisma.repository";
import { DeliverymanPrismaRepository } from "../../../db/prisma/repositorys/deliveryman.repository";
import { AuthenticateClientUseCase } from "../../../../application/authenticate/authenticate-client.use-case";
import { AuthenticateDeliverymanUseCase } from "../../../../application/authenticate/authenticate-deliveryman.use-case";

const authenticateRoutes = Router();
const clientRepo = new ClientPrismaRepository();
const deliverymanRepo = new DeliverymanPrismaRepository();

authenticateRoutes.post('/client/authenticate', async(request: Request, response: Response) =>{
    const authenticateClientUseCase = new AuthenticateClientUseCase(clientRepo)
    const resultAuthentication = await authenticateClientUseCase.execute(request.body)
    return response.json(resultAuthentication)
})

authenticateRoutes.post('/deliveryman/authenticate', async(request: Request, response: Response) =>{
    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase(deliverymanRepo);
    const resultAuthentication = await authenticateDeliverymanUseCase.execute(request.body)
    return response.json(resultAuthentication)
})

export { authenticateRoutes}

