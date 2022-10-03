import { DeliverymanRepositoryInterface } from '../../domain/deliveryman/deliveryman.repository';

export class DeleteDeliverymanUseCase{
    constructor(private deliverymanRepo:DeliverymanRepositoryInterface){}

    async execute(id: string): Promise<void>{
       await this.deliverymanRepo.delete(id)
    }
}

