import {Delivery, LatLng} from '../../domain/delivery/delivery.entity'
import { DeliveryRepositoryInterface } from '../../domain/delivery/delivery.repository';

export class CreateDeliveryUseCase{
    constructor(private deliveryRepo:DeliveryRepositoryInterface){}

    async execute(input: CreateDeliveryInput): Promise<CreateDeliveryOutput>{
       const delivery = Delivery.create(input);
       const deliveryCreated = await this.deliveryRepo.insert(delivery)
       return deliveryCreated.toJSON();
    }
}

type CreateDeliveryInput={
    id_client: string,
    id_deliveryman?: string,
    name_item: string,
    size_item: 'small' | 'medium' | 'large'
    startPosition: LatLng,
    endPosition: LatLng
}

type CreateDeliveryOutput={
    id: string;
    id_client: string;
    id_deliveryman: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
    created_at: Date;
    end_at: Date;
}