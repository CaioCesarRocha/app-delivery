import { LatLng } from "@core/domain/delivery/delivery.entity";
import { DeliveryRepositoryInterface } from "@core/domain/delivery/delivery.repository";

export class FindOneDeliveryUseCase{
    constructor(private deliveryRepo: DeliveryRepositoryInterface){}
    async execute(id: string): Promise<FindOneDeliveryOutput>{
        const delivery = await this.deliveryRepo.findOne(id);
        return delivery.toJSON();
    }
}

type FindOneDeliveryOutput={
    id: string;
    id_client: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
}