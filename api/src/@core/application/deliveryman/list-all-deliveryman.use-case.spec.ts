import { DeliverymanInMemoryRepository } from "../../infra/db/in-memory/deliveryman-in-memory.repository";
import { ListAllDeliverymanUseCase } from "./list-all-deliveryman.use-case";
import { CreateDeliverymanUseCase } from "./create-deliveryman.use-case"

describe('Testing ListAll Deliveryman UseCase', ()=>{
    it('Should Listall deliveryman', async() =>{
        const repository = new DeliverymanInMemoryRepository();
        const createNewDeliveryman = new CreateDeliverymanUseCase(repository)
        await createNewDeliveryman.execute({
            username: 'Silver',
            password: 'K1K2K3'
        })
        const listAllDeliverys = new ListAllDeliverymanUseCase(repository)
        const alldeliverys = await listAllDeliverys.execute();

        expect(repository.deliverymen).toHaveLength(1);
        expect(alldeliverys[0].id).toBe(repository.deliverymen[0].id);
        expect(alldeliverys[0].username).toBe('Silver');
    })   
})