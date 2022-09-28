import {LatLng} from '../../domain/delivery/delivery.entity'
import { DeliveryRepositoryInterface } from '../../domain/delivery/delivery.repository';

export class ListAllAvaliableDeliveryUseCase{
    constructor(private deliveryRepo: DeliveryRepositoryInterface){}

    async execute():Promise<ListAllAvaliableDeliveryOutput>{
        const deliverysAvaliable = await this.deliveryRepo.listAllAvaliable(); 
        return deliverysAvaliable.map(delivery => delivery.toJSON())
    }
}

type ListAllAvaliableDeliveryOutput={
    id: string;
    id_client: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
}[]; 