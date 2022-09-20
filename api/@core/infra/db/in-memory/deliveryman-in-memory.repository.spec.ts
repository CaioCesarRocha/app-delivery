import { DeliverymanInMemoryRepository } from "./deliveryman-in-memory.repository";
import { Deliveryman, DeliverymanProps } from "../../../domain/devileryman/deliveryman.entity";

describe('Testing DeliverymanInMemoryRepository', () =>{
    it('Should insert a new Deliveryman', async() =>{
        const repository = new DeliverymanInMemoryRepository();
        let deliverymanProps: DeliverymanProps ={
            username: 'Silver',
            password: 'K1K2K3'
        }
        const deliveryman = Deliveryman.create(deliverymanProps);
        await repository.insert(deliveryman)
        
        expect(repository.deliverymen).toHaveLength(1)
        expect(repository.deliverymen).toStrictEqual([deliveryman])
    })
})