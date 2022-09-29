import {LatLng} from '../../domain/delivery/delivery.entity'
import { DeliveryRepositoryInterface } from '../../domain/delivery/delivery.repository';

export class ListDeliverysDeliverymanUseCase{
    constructor(private deliveryRepo: DeliveryRepositoryInterface){}

    async execute(id_deliveryman: string):Promise<ListDeliverysDeliverymanOutput>{
        const deliverysDeliveryman = await this.deliveryRepo.listDeliverysDeliveryman(id_deliveryman); 
        return deliverysDeliveryman.map(delivery => delivery.toJSON())
    }
}

type ListDeliverysDeliverymanOutput={
    id: string;
    id_client: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
}[]; 