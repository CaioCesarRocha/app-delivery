import { DeliveryInMemoryRepository } from "../../infra/db/in-memory/delivery-in-memory.repository";
import { CreateDeliveryUseCase } from "./create-delivery.use-case"
import { UpdateDeliveryUseCase } from "./update-delivery.use-case";

describe('Testing Update Delivery Use Case', () =>{
    it('Should modify a delivery', async() =>{
        const repository = new DeliveryInMemoryRepository();
        const createNewDelivery = new CreateDeliveryUseCase(repository)
        const delivery = await createNewDelivery.execute({
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: {lat: -23.522400, lng: -46.736600},
            endPosition: {lat: -23.522600, lng: -46.736800},
        })
        const updateDeliverys = new UpdateDeliveryUseCase(repository); 
        delivery.name_item = 'Eletrodomésticos';
        delivery.size_item = 'large';
        const updatedDelivery = await updateDeliverys.execute(delivery.id, delivery)

        expect(repository.deliverys).toHaveLength(1);
        expect(updatedDelivery).toStrictEqual({
            id: repository.deliverys[0].id,
            id_client: delivery.id_client,
            name_item: 'Eletrodomésticos',
            size_item: 'large',
            startPosition: delivery.startPosition,
            endPosition: delivery.endPosition,
            id_deliveryman: '',
            status: 'open',
            price: 200
        })
    })
})