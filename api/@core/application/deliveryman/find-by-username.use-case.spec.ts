import { DeliverymanInMemoryRepository } from "../../infra/db/in-memory/deliveryman-in-memory.repository";
import { CreateDeliverymanUseCase } from "./create-deliveryman.use-case";
import { FindDeliverymanByUsernameUseCase } from "./find-by-username.use-case";


describe('Testing Find By Username Deliveryman UseCase', () =>{
    it('Should find a Deliveryman By Username', async() =>{
        const repository = new DeliverymanInMemoryRepository();
        const createNewDeliveryman = new CreateDeliverymanUseCase(repository)      
        const newDeliveryman = await createNewDeliveryman.execute({
            username: 'Silver',
            password: 'K1K2K3'
        });    
        const findOneClient = new FindDeliverymanByUsernameUseCase(repository);
        const deliveryman = await findOneClient.execute(newDeliveryman.username)
   
        expect(deliveryman).toStrictEqual({
            id: deliveryman.id,
            username: deliveryman.username,
            password: deliveryman.password
        })
    })
})