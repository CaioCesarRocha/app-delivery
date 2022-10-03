import {LatLng} from '../../domain/delivery/delivery.entity'
import { DeliveryRepositoryInterface } from '../../domain/delivery/delivery.repository';

export class ListAllDeliveryUseCase{
    constructor(private deliveryRepo: DeliveryRepositoryInterface){}

    async execute():Promise<ListAllDeliveryOutput>{
        const deliverys = await this.deliveryRepo.listAll(); 
        return deliverys.map(delivery => delivery.toJSON())
    }
}

type ListAllDeliveryOutput={
    id: string;
    id_client: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
}[]; 