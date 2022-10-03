import { DeliveryInMemoryRepository } from "../../infra/db/in-memory/delivery-in-memory.repository";
import { ListDeliverysClientUseCase } from "./list-delivery-client.use-case";
import { CreateDeliveryUseCase } from "./create-delivery.use-case"

describe('Testing List Deliverys Client UseCase', ()=>{
    it('Should ListAll Deliverys Client', async() =>{
        const repository = new DeliveryInMemoryRepository();
        const newDelivery = new CreateDeliveryUseCase(repository)
        await newDelivery.execute({
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: [-23.522400, -46.736600],
            endPosition: [ -23.522600, -46.736800],
        })

        const listDeliverysClient = new ListDeliverysClientUseCase(repository)
        const response = await listDeliverysClient.execute('1');

        expect(response).toHaveLength(1);
        expect(response[0]).toStrictEqual({
            id: repository.deliverys[0].id,
            id_client: '1',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: [-23.522400, -46.736600],
            endPosition: [ -23.522600,  -46.736800],
            id_deliveryman: undefined,
            status: 'open',
            price: 200,
            created_at: undefined,
            end_at: undefined
        })
    })   
})