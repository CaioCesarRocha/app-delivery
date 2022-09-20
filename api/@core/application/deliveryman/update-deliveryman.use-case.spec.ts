import { DeliverymanInMemoryRepository } from "../../infra/db/in-memory/deliveryman-in-memory.repository";
import { UpdateDeliverymanUseCase } from "./update-deliveryman.use-case";
import { CreateDeliverymanUseCase } from "./create-deliveryman.use-case"

describe('Testing Update Delivery UseCase', ()=>{
    it('Should Update a delivery', async() =>{
        const repository = new DeliverymanInMemoryRepository();
        const createNewDeliveryman = new CreateDeliverymanUseCase(repository)
        const newDeliveryman = await createNewDeliveryman.execute({
            username: 'Silver',
            password: 'K1K2K3'
        })
        const updatedDeliverymen = new UpdateDeliverymanUseCase(repository)
        newDeliveryman.username = 'Copper'
        const newDeliverymanupdated = await updatedDeliverymen.execute(newDeliveryman.id , newDeliveryman)

        expect(repository.deliverymen).toHaveLength(1);
        expect(newDeliverymanupdated).toStrictEqual({
            id: repository.deliverymen[0].id,
            username: 'Copper',
            password: newDeliveryman.password            
        })
    })   
})