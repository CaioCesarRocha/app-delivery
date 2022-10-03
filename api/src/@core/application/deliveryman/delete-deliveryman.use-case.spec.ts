import { DeliverymanInMemoryRepository } from "../../infra/db/in-memory/deliveryman-in-memory.repository";
import { DeleteDeliverymanUseCase } from "./delete-deliveryman.use-case";
import { CreateDeliverymanUseCase } from "./create-deliveryman.use-case"

describe('Testing Delete Deliverys UseCase', ()=>{
    it('Should delete a deliverys', async() =>{
        const repository = new DeliverymanInMemoryRepository();
        const createNewDeliveryman = new CreateDeliverymanUseCase(repository)
        const newDelivery =  await createNewDeliveryman.execute({
            username: 'Silver',
            password: 'K1K2K3'
        })
        expect(repository.deliverymen).toHaveLength(1);

        const deleteDeliverymen = new DeleteDeliverymanUseCase(repository)
        await deleteDeliverymen.execute(newDelivery.id)
        expect(repository.deliverymen).toHaveLength(0);
    })   
})