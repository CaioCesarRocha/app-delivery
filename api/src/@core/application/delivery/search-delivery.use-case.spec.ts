import { DeliveryInMemoryRepository } from "../../infra/db/in-memory/delivery-in-memory.repository";
import { SearchDeliveryUseCase } from "./search-delivery.use-case";
import { CreateDeliveryUseCase } from "./create-delivery.use-case"

describe('Testing Search Deliverys UseCase', ()=>{
    it('Should Search Deliverys', async() =>{
        const repository = new DeliveryInMemoryRepository();
        const newDelivery = new CreateDeliveryUseCase(repository)
        await newDelivery.execute({
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: [-23.522400, -46.736600],
            endPosition: [ -23.522600, -46.736800],
        })

        const searchDelivery = new SearchDeliveryUseCase(repository)
        const response = await searchDelivery.execute('Geladeira');

        expect(response[0]).toStrictEqual({
            id: repository.deliverys[0].id,
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: [-23.522400, -46.736600],
            endPosition: [ -23.522600,  -46.736800],
            id_deliveryman: undefined,
            status: 'open',
            price: 30,
            created_at: undefined,
            end_at: undefined
        })
    })   
})