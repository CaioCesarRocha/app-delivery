import { Router, Request, Response} from "express";
import { DeliveryPrismaRepository } from "../../db/prisma/repositorys/delivery.prisma.repository";
import { ListAllDeliveryUseCase } from "../../../application/delivery/list-all-deliverys.use-case";
import { FindOneDeliveryUseCase } from "../../../application/delivery/find-one-delivery.use-case";
import { CreateDeliveryUseCase } from "../../../application/delivery/create-delivery.use-case";
import { DeleteDeliveryUseCase } from "../../../application/delivery/delete-delviery.use-case";
import { UpdateDeliveryUseCase } from "../../../application/delivery/update-delivery.use-case";

const deliveryRoutes = Router();
const deliveryRepo = new DeliveryPrismaRepository();
//const clientInMemoryRepo = new ClientInMemoryRepository();

deliveryRoutes.get('/delivery',  async(req: Request, res: Response) =>{
    const listAllDelivery = new ListAllDeliveryUseCase(deliveryRepo);
    const output = await listAllDelivery.execute()
    res.status(200).json(output)
})

deliveryRoutes.get('/delivery/:id',  async(req: Request, res: Response) =>{ 
    const id_delivery = req.params.id  
    const findOneDelivery = new FindOneDeliveryUseCase(deliveryRepo);
    const output = await findOneDelivery.execute(id_delivery)
    res.status(200).json(output)
})

deliveryRoutes.post('/delivery',  async(req: Request, res: Response) =>{ 
    const createUseCase = new CreateDeliveryUseCase(deliveryRepo) 
    const output = await createUseCase.execute(req.body);
    res.status(201).json(output) 
})

deliveryRoutes.put('/delivery/:id',  async(req: Request, res: Response) =>{ 
    const id_delivery = req.params.id
    const delivery = req.body 
    const updateUseCase = new UpdateDeliveryUseCase(deliveryRepo);
    const output = await updateUseCase.execute(id_delivery, delivery)
    res.status(200).json(output)
})

deliveryRoutes.delete('/delivery/:id',  async(req: Request, res: Response) =>{  
    const id_delivery = req.params.id  
    const deleteUseCase = new DeleteDeliveryUseCase(deliveryRepo);
    const output = await deleteUseCase .execute(id_delivery)
    res.status(200).json(output)
})

export { deliveryRoutes}

