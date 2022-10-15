import { DeliveryRepositoryInterface } from "src/@core/domain/delivery/delivery.repository";
import { LatLng } from "src/@core/domain/delivery/delivery.entity";

export class FilterDeliveryUseCase{
    constructor(private deliveryRepo: DeliveryRepositoryInterface){}

    async execute(filter: string): Promise<FilterDeliveryOutput>{
        const deliverys = await this.deliveryRepo.filterDelivery(filter);
        return deliverys.map(delivery => delivery.toJSON());
    }
}

type FilterDeliveryOutput={
    id: string;
    id_client: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
}[];

