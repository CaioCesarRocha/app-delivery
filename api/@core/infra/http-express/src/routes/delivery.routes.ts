import { Router, Request, Response} from "express";
import { DeliveryPrismaRepository } from "../../../db/prisma/repositorys/delivery.prisma.repository";
import { ListAllDeliveryUseCase } from "../../../../application/delivery/list-all-deliverys.use-case";
import { ListAvailableDeliveryUseCase} from "../../../../application/delivery/list-delivery-avaliable.use-case";
import { ListDeliverysClientUseCase } from "../../../../application/delivery/list-delivery-client.use-case";
import { FindOneDeliveryUseCase } from "../../../../application/delivery/find-one-delivery.use-case";
import { CreateDeliveryUseCase } from "../../../../application/delivery/create-delivery.use-case";
import { DeleteDeliveryUseCase } from "../../../../application/delivery/delete-delviery.use-case";
import { UpdateDeliveryUseCase } from "../../../../application/delivery/update-delivery.use-case";
import { ensureAuthenticateClient } from "../middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "../middlewares/ensureAuthenticateDeliveryman";



const deliveryRoutes = Router();
const deliveryRepo = new DeliveryPrismaRepository();
//const clientInMemoryRepo = new ClientInMemoryRepository();

deliveryRoutes.get('/delivery',  async(req: Request, res: Response) =>{
    const listAllDelivery = new ListAllDeliveryUseCase(deliveryRepo);
    const output = await listAllDelivery.execute()
    res.status(200).json(output)
})

deliveryRoutes.get('/delivery/client', ensureAuthenticateClient,async(req: Request, res: Response) =>{
    const { id_client } = req;
    const listDeliverysClient = new ListDeliverysClientUseCase(deliveryRepo);
    const output = await listDeliverysClient.execute(id_client)
    res.status(200).json(output)
})

deliveryRoutes.get('/delivery/avaliable', ensureAuthenticateDeliveryman,async(req: Request, res: Response) =>{
    const listDeliverysAvailable = new ListAvailableDeliveryUseCase(deliveryRepo);
    const output = await listDeliverysAvailable.execute()
    res.status(200).json(output)
})

deliveryRoutes.get('/delivery/:id',  async(req: Request, res: Response) =>{ 
    const id_delivery = req.params.id  
    const findOneDelivery = new FindOneDeliveryUseCase(deliveryRepo);
    const output = await findOneDelivery.execute(id_delivery)
    res.status(200).json(output)
})

//middlware necessário pois o cliente precisa estar com login válido(token) na hora de criar uma delivery
deliveryRoutes.post('/delivery', ensureAuthenticateClient, async(req: Request, res: Response) =>{ 
    const { id_client } = req; //id_client vira depois de ser válido no middlware
    const delivery = req.body;  
    const newDelivery = { id_client, ...delivery}
    const createUseCase = new CreateDeliveryUseCase(deliveryRepo) 
    const output = await createUseCase.execute(newDelivery);
    res.status(201).json(output) 
})

deliveryRoutes.put('/delivery/:id', ensureAuthenticateDeliveryman, async(req: Request, res: Response) =>{ 
    const id_delivery = req.params.id
    const delivery = req.body 
    const updateUseCase = new UpdateDeliveryUseCase(deliveryRepo);
    const output = await updateUseCase.execute(id_delivery, delivery)
    res.status(200).json(output)
})

deliveryRoutes.delete('/delivery/:id', ensureAuthenticateClient,  async(req: Request, res: Response) =>{  
    const id_delivery = req.params.id  
    const deleteUseCase = new DeleteDeliveryUseCase(deliveryRepo);
    const output = await deleteUseCase .execute(id_delivery)
    res.status(200).json(output)
})

export { deliveryRoutes}

