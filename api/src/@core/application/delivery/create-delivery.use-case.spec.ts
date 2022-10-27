import { DeliveryInMemoryRepository } from "../../infra/db/in-memory/delivery-in-memory.repository"
import { CreateDeliveryUseCase } from "./create-delivery.use-case"

describe('Testing Create Deliverys UseCase', ()=>{
    it('Should Create a Delivery', async() =>{
        const repository = new DeliveryInMemoryRepository();
        const createDelivery = new CreateDeliveryUseCase(repository)

        const newDelivery = await createDelivery.execute({
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: [-23.522400,-46.736600],
            endPosition: [-23.522600,-46.736800],
        })

        expect(repository.deliverys).toHaveLength(1);
        expect(newDelivery).toStrictEqual({
            id: repository.deliverys[0].id,
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: [-23.522400, -46.736600],
            endPosition: [-23.522600,-46.736800],
            id_deliveryman: undefined,
            status: 'open',
            price: 30,
            created_at: undefined,
            end_at: undefined
        })
    })   
})