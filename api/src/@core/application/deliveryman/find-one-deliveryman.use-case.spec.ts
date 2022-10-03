import { DeliverymanInMemoryRepository } from "../../infra/db/in-memory/deliveryman-in-memory.repository";
import { FindOneDeliverymanUseCase } from "./find-one-deliveryman.use-case";
import { CreateDeliverymanUseCase } from "./create-deliveryman.use-case"

describe('Testing FindOne Delivery UseCase', ()=>{
    it('Should Find one delivery', async() =>{
        const repository = new DeliverymanInMemoryRepository();
        const createNewDeliveryman = new CreateDeliverymanUseCase(repository)
        const newDeliveryman = await createNewDeliveryman.execute({
            username: 'Silver',
            password: 'K1K2K3'
        })
        const updatedDeliverymen = new FindOneDeliverymanUseCase(repository)
        const deliveryman = await updatedDeliverymen.execute(newDeliveryman.id )

        expect(deliveryman).toStrictEqual({
            id: repository.deliverymen[0].id,
            username: newDeliveryman.username,
            password: newDeliveryman.password            
        })
    })   
})