import {Delivery, LatLng} from '../../domain/delivery/delivery.entity'
import { DeliveryRepositoryInterface } from '../../domain/delivery/delivery.repository';

export class UpdateDeliveryUseCase{
    constructor(private deliveryRepo: DeliveryRepositoryInterface){}

    async execute(id: string, input: UpdateDeliveryInput): Promise<UpdateDeliveryOutput>{
        const delivery = Delivery.create(input, id);
        if(delivery.status === 'closed') delivery.updateEndAt(new Date())
        const deliveryUpdated = await this.deliveryRepo.update(id, delivery)    
        return deliveryUpdated.toJSON();
    }
}

type UpdateDeliveryInput={
    id: string,
    id_client: string,
    id_deliveryman?: string,
    name_item: string,
    size_item: 'small' | 'medium' | 'large'
    startPosition: LatLng,
    endPosition: LatLng
}

type UpdateDeliveryOutput={
    id: string;
    id_client: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
}