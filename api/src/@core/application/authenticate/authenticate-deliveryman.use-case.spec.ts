
import { DeliverymanInMemoryRepository } from "../../infra/db/in-memory/deliveryman-in-memory.repository";
import { CreateDeliverymanUseCase } from "../deliveryman/create-deliveryman.use-case";
import { AuthenticateDeliverymanUseCase } from "./authenticate-deliveryman.use-case";

describe('Testing Authenticate Deliveryman UseCase', () =>{
    it('Should Authentica a Deliveryman', async() =>{
        const newDeliveryman={
            username: 'Silver',
            password: 'K1K2K3'
        }
        const repository = new DeliverymanInMemoryRepository();
        const createNewDeliveryman = new CreateDeliverymanUseCase(repository)      
        await createNewDeliveryman.execute(newDeliveryman);    

        const authenticateDeliveryman = new AuthenticateDeliverymanUseCase(repository);
        const deliveryman = await authenticateDeliveryman.execute(newDeliveryman)

        expect(deliveryman).toHaveProperty('token')        
    })
})