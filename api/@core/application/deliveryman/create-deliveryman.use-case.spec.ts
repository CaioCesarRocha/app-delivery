import { DeliverymanInMemoryRepository } from "../../infra/db/in-memory/deliveryman-in-memory.repository";
import { CreateDeliverymanUseCase } from "./create-deliveryman.use-case"

describe('Testing Create Deliveryman UseCase', ()=>{
    it('Should Create a Deliveryman', async() =>{
        const repository = new DeliverymanInMemoryRepository();
        const newDeliveryman = new CreateDeliverymanUseCase(repository)
        const response = await newDeliveryman.execute({
            username: 'Silver',
            password: 'K1K2K3'
        })

        expect(repository.deliverymen).toHaveLength(1);
        expect(response.id).toBeDefined;
        expect(response.id).toEqual(repository.deliverymen[0].id);
        expect(response.username).toEqual('Silver');
    })   
})