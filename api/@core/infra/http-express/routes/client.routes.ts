import { Router, Request, Response} from "express";
import { FindOneClientUseCase } from "@core/application/client/find-one-client.use-case";

const clientsRoutes = Router();

clientsRoutes.get('/clients',  async(req: Request, res: Response) =>{
})

clientsRoutes.get('/clients/:id',  async(req: Request, res: Response) =>{ 
    const id = req.params.id   
    const findOneClientUseCase = new FindOneClientUseCase();
    const output = findOneClientUseCase.execute(id)
    res.status(200).json(output)
})

clientsRoutes.post('/clients',  async(req: Request, res: Response) =>{  
})

clientsRoutes.put('/clients/:id',  async(req: Request, res: Response) =>{  
})

clientsRoutes.delete('/clients/:id',  async(req: Request, res: Response) =>{   
})

export { clientsRoutes}

