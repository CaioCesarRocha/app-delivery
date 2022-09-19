import {Delivery, LatLng} from '../../domain/delivery/delivery.entity'
import { DeliveryRepositoryInterface } from '../../domain/delivery/delivery.repository';

export class CreateDeliveryUseCase{
    constructor(private deliveryRepo:DeliveryRepositoryInterface){}

    async execute(input: CreateDeliveryInput): Promise<CreateDeliveryOutput>{
       const delivery = Delivery.create(input); 
       await this.deliveryRepo.insert(delivery)
       return delivery.toJSON();
    }
}

type CreateDeliveryInput={
    id_client: string,
    name_item: string,
    size_item: 'small' | 'medium' | 'large'
    startPosition: LatLng,
    endPosition: LatLng
}

type CreateDeliveryOutput={
    id: string;
    id_client: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
}