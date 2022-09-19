import { Delivery, DeliveryProps} from './delivery.entity';

describe('Testing Delivery Entity', () =>{
    it('testing constructor', () =>{
        const deliveryProps: DeliveryProps = {
            id_client: 'K1K2K3',
            name_item : 'Documents',
            size_item: 'small',
            startPosition: {lat: -23.522400, lng: -46.736600},
            endPosition: {lat: -23.522600, lng: -46.736800},
        }
        const newDelivery =  Delivery.create(deliveryProps)
        expect(newDelivery.id).toBeDefined();
        expect(newDelivery.props.price).toBeDefined();
        expect(newDelivery.props).toStrictEqual(
            {...deliveryProps, price: 170, id_deliveryman: '', status: 'open'}
        )
    })


    it('testing update product/size', () =>{
        const deliveryProps: DeliveryProps = {
            id_client: 'K1K2K3',
            name_item : 'Bateria',
            size_item: 'medium',
            startPosition: {lat: 10, lng: 10},
            endPosition: {lat: 20, lng: 20},
        }
        const newDelivery =  Delivery.create(deliveryProps)
        newDelivery.updateNameItem('Bateria, Violão, Baixo e 2 caixas de som')
        newDelivery.updateSizeItem('large')
        expect(newDelivery.id).toBeDefined();
        expect(newDelivery.name_item).toStrictEqual('Bateria, Violão, Baixo e 2 caixas de som')
        expect(newDelivery.size_item).toStrictEqual('large')
    })
})