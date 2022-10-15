import { DeliveryRepositoryInterface } from "src/@core/domain/delivery/delivery.repository";
import { LatLng } from "src/@core/domain/delivery/delivery.entity";

export class SearchDeliveryUseCase{
    constructor(private deliveryRepo: DeliveryRepositoryInterface){}

    async execute(search: string): Promise<SearchDeliveryOutput>{
        const deliverys = await this.deliveryRepo.searchDelivery(search);
        return deliverys.map(delivery => delivery.toJSON());
    }
}

type SearchDeliveryOutput={
    id: string;
    id_client: string;
    name_item: string;
    size_item: 'small' | 'medium' | 'large';
    startPosition: LatLng;
    endPosition: LatLng;
    status: 'open' | 'inprogress' | 'closed';
    price: number;
}[];

