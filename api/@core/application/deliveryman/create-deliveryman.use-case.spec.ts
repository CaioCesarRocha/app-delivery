import { DeliverymanInMemoryRepository } from "../../infra/db/in-memory/deliveryman-in-memory.repository";
import { CreateDeliverymanUseCase } from "./create-deliveryman.use-case"

describe('Testing Create Deliverys UseCase', ()=>{
    it('Should Create a Delivery', async() =>{
        const repository = new DeliverymanInMemoryRepository();
        const newDeliveryman = new CreateDeliverymanUseCase(repository)
        const response = await newDeliveryman.execute({
            username: 'Silver',
            password: 'K1K2K3'
        })

        expect(repository.deliverymen).toHaveLength(1);
        expect(response.id).toBeDefined;
        expect(response).toStrictEqual({
            id: repository.deliverymen[0].id,
            username: 'Silver',
            password: 'K1K2K3'            
        })
    })   
})