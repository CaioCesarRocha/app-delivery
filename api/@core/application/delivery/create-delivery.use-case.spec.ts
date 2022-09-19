import { DeliveryInMemoryRepository } from "../../infra/db/in-memory/delivery/delivery-in-memory.repository"
import { CreateDeliveryUseCase } from "./create-delivery.use-case"


describe('Testing Create Deliverys UseCase', ()=>{
    it('Should Create a Delivery', async() =>{
        const repository = new DeliveryInMemoryRepository();
        const newDelivery = new CreateDeliveryUseCase(repository)

        const response = await newDelivery.execute({
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: {lat: -23.522400, lng: -46.736600},
            endPosition: {lat: -23.522600, lng: -46.736800},
        })

        expect(repository.deliverys).toHaveLength(1);
        expect(response).toStrictEqual({
            id: repository.deliverys[0].id,
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: {lat: -23.522400, lng: -46.736600},
            endPosition: {lat: -23.522600, lng: -46.736800},
            id_deliveryman: '',
            status: 'open',
            price: 200
        })
    })   
})