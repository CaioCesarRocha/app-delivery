import { DeliveryInMemoryRepository } from "../../infra/db/in-memory/delivery-in-memory.repository";
import { CreateDeliveryUseCase } from "./create-delivery.use-case"
import { DeleteDeliveryUseCase } from "./delete-delviery.use-case";

describe('Testing Delete Delivery Use Case', () =>{
    it('Should delete a delivery', async() =>{
        const repository = new DeliveryInMemoryRepository();
        const createNewDelivery = new CreateDeliveryUseCase(repository)
        const delivery = await createNewDelivery.execute({
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: [-23.522400, -46.736600],
            endPosition: [-23.522600, -46.736800],
        })
        expect(repository.deliverys).toHaveLength(1)

        const deleteDeliverys = new DeleteDeliveryUseCase(repository)
        await deleteDeliverys.execute(delivery.id)
        expect(repository.deliverys).toHaveLength(0)
    })
})