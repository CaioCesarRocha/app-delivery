import {LatLng} from '../../domain/delivery/delivery.entity'
import { DeliveryRepositoryInterface } from '../../domain/delivery/delivery.repository';

export class ListDeliverysClientUseCase{
    constructor(private deliveryRepo: DeliveryRepositoryInterface){}

    async execute(id_client: string):Promise<ListDeliverysClientOutput>{
        const deliverysClient = await this.deliveryRepo.listDeliverysClient(id_client); 
        return deliverysClient.map(delivery => delivery.toJSON())
    }
}

type ListDeliverysClientOutput={
    id: string;
    id_client: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
}[]; 