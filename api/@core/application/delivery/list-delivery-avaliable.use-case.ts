import {LatLng} from '../../domain/delivery/delivery.entity'
import { DeliveryRepositoryInterface } from '../../domain/delivery/delivery.repository';

export class ListAvailableDeliveryUseCase{
    constructor(private deliveryRepo: DeliveryRepositoryInterface){}

    async execute():Promise<ListAllAvailableDeliveryOutput>{
        const deliverysAvailable = await this.deliveryRepo.listAllAvailable(); 
        return deliverysAvailable.map(delivery => delivery.toJSON())
    }
}

type ListAllAvailableDeliveryOutput={
    id: string;
    id_client: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
}[]; 