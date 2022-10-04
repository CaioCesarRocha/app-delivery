import { LatLng, sizeItem, statusDelivery } from "src/@core/domain/delivery/delivery.entity";

export class CreateDeliveryDto {
    id_client: string
    id_deliveryman?: string
    name_item: string
    size_item: sizeItem
    startPosition: LatLng
    endPosition: LatLng
    status?: statusDelivery
    price?: number
    created_at?: Date
    end_at?: Date
}
