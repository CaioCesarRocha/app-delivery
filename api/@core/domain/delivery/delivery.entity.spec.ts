import { Delivery, DeliveryProps} from './delivery.entity';

describe('Testing Delivery Entity', () =>{
    it('testing constructor', () =>{
        const deliveryProps: DeliveryProps = {
            id_client: 'K1K2K3',
            name_item : 'Documents',
            size_item: 'small',
            startPosition: [-23.522400,  -46.736600],
            endPosition: [ -23.522600,  -46.736800],
        }
        const newDelivery =  Delivery.create(deliveryProps)
        expect(newDelivery.id).toBeDefined();
        expect(newDelivery.props.price).toBeDefined();
        expect(newDelivery.props).toStrictEqual(
            {...deliveryProps, 
                price: 170,
                id_deliveryman: undefined, 
                status: 'open',
                created_at: undefined,
                end_at: undefined
            }
        )
    })


    it('testing update product/size', () =>{
        const deliveryProps: DeliveryProps = {
            id_client: 'K1K2K3',
            name_item : 'Bateria',
            size_item: 'medium',
            startPosition: [10,  10],
            endPosition: [ 20,  20],
        }
        const newDelivery =  Delivery.create(deliveryProps)
        newDelivery.updateNameItem('Bateria, Violão, Baixo e 2 caixas de som')
        newDelivery.updateSizeItem('large')
        expect(newDelivery.id).toBeDefined();
        expect(newDelivery.name_item).toStrictEqual('Bateria, Violão, Baixo e 2 caixas de som')
        expect(newDelivery.size_item).toStrictEqual('large')
    })
})