import { DeliveryRepositoryInterface } from "@core/domain/delivery/delivery.repository";


export class DeleteDeliveryUseCase{
    constructor(private deliveryrepo: DeliveryRepositoryInterface){}

    async execute(id: string){
        await this.deliveryrepo.delete(id);
    }
}