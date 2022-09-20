import { DeliverymanInMemoryRepository } from "../../infra/db/in-memory/deliveryman-in-memory.repository";
import { ListAllDeliverymanUseCase } from "./list-all-deliveryman.use-case";
import { CreateDeliverymanUseCase } from "./create-deliveryman.use-case"

describe('Testing ListAll Deliverys UseCase', ()=>{
    it('Should Listall deliverys', async() =>{
        const repository = new DeliverymanInMemoryRepository();
        const createNewDeliveryman = new CreateDeliverymanUseCase(repository)
        await createNewDeliveryman.execute({
            username: 'Silver',
            password: 'K1K2K3'
        })
        const listAllDeliverys = new ListAllDeliverymanUseCase(repository)
        const alldeliverys = await listAllDeliverys.execute();

        expect(repository.deliverymen).toHaveLength(1);
        expect(alldeliverys[0]).toStrictEqual({
            id: repository.deliverymen[0].id,
            username: 'Silver',
            password: 'K1K2K3'            
        })
    })   
})