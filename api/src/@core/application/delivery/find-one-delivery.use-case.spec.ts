import { DeliveryInMemoryRepository } from "../../infra/db/in-memory/delivery-in-memory.repository";
import { CreateDeliveryUseCase } from "./create-delivery.use-case"
import { FindOneDeliveryUseCase } from "./find-one-delivery.use-case";

describe('Testing FindOne Delivery Use Case', () =>{
    it('Should Find a delivery', async() =>{
        const repository = new DeliveryInMemoryRepository();
        const createNewDelivery = new CreateDeliveryUseCase(repository)
        const newDelivery = await createNewDelivery.execute({
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: [ -23.522400, -46.736600],
            endPosition: [ -23.522600,  -46.736800],
        })

        const findOneDelivery = new FindOneDeliveryUseCase(repository)
        const delivery = await findOneDelivery.execute(newDelivery.id)
        expect(delivery).toStrictEqual({
            ...newDelivery,
            id: repository.deliverys[0].id,
            id_deliveryman: undefined,
            status: 'open',
            price: 30,
            created_at: undefined,
            end_at: undefined
        })
    })
})