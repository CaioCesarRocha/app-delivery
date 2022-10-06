import {Deliveryman, DeliverymanProps} from './deliveryman.entity';

describe('Testing Deliveryman Entity', () =>{      
    it('testing constructor',() =>{
        const deliverymanProps: DeliverymanProps ={
            username: 'Silver',
            password: '12345'
        }
        const newDeliveryman = Deliveryman.create(deliverymanProps)
        expect(newDeliveryman.id).toBeDefined()
        expect(newDeliveryman.props).toStrictEqual(deliverymanProps)
    })

    it('Testing Update Username',() =>{
        const deliverymanProps: DeliverymanProps ={
            username: 'Silver',
            password: '12345'
        }
        const newDeliveryman = Deliveryman.create(deliverymanProps)
        newDeliveryman.updateUsername('Scopper')
        expect(newDeliveryman.id).toBeDefined()
        expect(newDeliveryman.props.username).toBe('Scopper')
    })
})