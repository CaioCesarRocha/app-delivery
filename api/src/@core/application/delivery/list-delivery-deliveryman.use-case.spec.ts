import { DeliveryInMemoryRepository } from "../../infra/db/in-memory/delivery-in-memory.repository";
import { ListDeliverysDeliverymanUseCase } from "./list-deliverys-deliveryman.use-case";
import { CreateDeliveryUseCase } from "./create-delivery.use-case"

describe('Testing List Deliverys Client UseCase', ()=>{
    it('Should ListAll Deliverys Client', async() =>{
        const repository = new DeliveryInMemoryRepository();
        const newDelivery = new CreateDeliveryUseCase(repository)
        await newDelivery.execute({
            id_client: '1',
            id_deliveryman: '2',           
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: [-23.522400, -46.736600],
            endPosition: [ -23.522600, -46.736800],
        })

        const listDeliverysDeliveryman = new ListDeliverysDeliverymanUseCase(repository)
        const response = await listDeliverysDeliveryman.execute('2');

        expect(response).toHaveLength(1);
        expect(response[0]).toStrictEqual({
            id: repository.deliverys[0].id,
            id_client: '1',
            id_deliveryman: '2',
            name_item: 'Geladeira',
            size_item: 'medium',
            startPosition: [-23.522400, -46.736600],
            endPosition: [ -23.522600,  -46.736800],            
            status: 'open',
            price: 30,
            created_at: undefined,
            end_at: undefined
        })
    })   
})