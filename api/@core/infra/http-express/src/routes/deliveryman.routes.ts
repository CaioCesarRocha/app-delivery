import { Router, Request, Response, NextFunction} from "express";
import { prisma } from "../../../db/prisma/prismaClient";
import { DeliverymanPrismaRepository } from "../../../db/prisma/repositorys/deliveryman.repository";
import { ListAllDeliverymanUseCase } from "../../../../application/deliveryman/list-all-deliveryman.use-case";
import { FindOneDeliverymanUseCase } from "../../../../application/deliveryman/find-one-deliveryman.use-case";
import { DeleteDeliverymanUseCase } from "../../../../application/deliveryman/delete-deliveryman.use-case";
import { CreateDeliverymanUseCase } from "../../../../application/deliveryman/create-deliveryman.use-case";
import { UpdateDeliverymanUseCase } from "../../../../application/deliveryman/update-deliveryman.use-case";

const deliverymanRoutes = Router();
const deliverymanRepo = new DeliverymanPrismaRepository();

deliverymanRoutes.get('/deliveryman',  async(req: Request, res: Response) =>{  
    const listAllDeliverymanUseCase = new ListAllDeliverymanUseCase(deliverymanRepo);
    const output = await listAllDeliverymanUseCase.execute();
    res.status(200).json(output)
})

deliverymanRoutes.get('/deliveryman/:id',  async(req: Request, res: Response) =>{ 
    const id_deliveryman = req.params.id  
    const findOneDeliverymanUseCase = new FindOneDeliverymanUseCase(deliverymanRepo);
    const output = await findOneDeliverymanUseCase.execute(id_deliveryman);
    res.status(200).json(output)
})

deliverymanRoutes.post('/deliveryman',  async(req: Request, res: Response) =>{  
    const deliverymanExist = await prisma.deliveryman.findUnique({where: {username: req.body.username}}) 
    if(deliverymanExist) throw new Error('Deliveryman already exist');
    else{
        const createUseCase = new CreateDeliverymanUseCase(deliverymanRepo);
        const output = await createUseCase.execute(req.body);
        res.status(201).json(output) 
    }  
})

deliverymanRoutes.put('/deliveryman/:id',  async(req: Request, res: Response) =>{ 
    const id_deliveryman = req.params.id;
    const deliveryman = req.body;
    const updateUseCase = new UpdateDeliverymanUseCase(deliverymanRepo);
    const output = await updateUseCase.execute(id_deliveryman, deliveryman)
    res.status(200).json(output)
})

deliverymanRoutes.delete('/deliveryman/:id',  async(req: Request, res: Response) =>{  
    const id_deliveryman = req.params.id;  
    const deleteDeliverymanUseCase = new DeleteDeliverymanUseCase(deliverymanRepo);
    const output = await deleteDeliverymanUseCase.execute(id_deliveryman)
    res.status(200).json(output)
})

export { deliverymanRoutes}

