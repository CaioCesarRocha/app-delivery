import { Router, Request, Response} from "express";
import { FindOneClientUseCase } from "../../../application/client/find-one-client.use-case";
import { ListAllClientUseCase } from "../../../application/client/list-all-client.use-case";
import { DeleteClientUseCase } from "../../../application/client/delete-client.use-case";
import { UpdateClientUseCase } from "../../../application/client/update-client.use-case";
import { CreateClientUseCase } from "../../../application/client/create-client.use-case";
import { ClientInMemoryRepository } from "../../db/in-memory/client-in-memory.repository";
import { ClientPrismaRepository } from "../../db/prisma/repositorys/client.prisma.repository";

const clientsRoutes = Router();
const clientRepo = new ClientPrismaRepository();
//const clientInMemoryRepo = new ClientInMemoryRepository();

clientsRoutes.get('/clients',  async(req: Request, res: Response) =>{
    const listallClientUseCase = new ListAllClientUseCase(clientRepo);
    const output = await listallClientUseCase.execute()
    res.status(200).json(output)
})

clientsRoutes.get('/clients/:id',  async(req: Request, res: Response) =>{ 
    const id_client = req.params.id  
    const findOneClientUseCase = new FindOneClientUseCase(clientRepo);
    const output = await findOneClientUseCase.execute(id_client)
    res.status(200).json(output)
})

clientsRoutes.post('/clients',  async(req: Request, res: Response) =>{ 
    const createUseCase = new CreateClientUseCase(clientRepo) 
    const output = await createUseCase.execute(req.body);
    res.status(201).json(output) 
})

clientsRoutes.put('/clients/:id',  async(req: Request, res: Response) =>{ 
    const id_client = req.params.id
    const client = req.body 
    const updateUseCase = new UpdateClientUseCase(clientRepo);
    const output = await updateUseCase.execute(id_client, client)
    res.status(200).json(output)
})

clientsRoutes.delete('/clients/:id',  async(req: Request, res: Response) =>{  
    const id_client = req.params.id  
    const deleteClientUseCase = new DeleteClientUseCase(clientRepo);
    const output = await deleteClientUseCase.execute(id_client)
    res.status(200).json(output)
})

export { clientsRoutes}

