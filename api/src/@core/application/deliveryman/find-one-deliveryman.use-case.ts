import { DeliverymanRepositoryInterface } from "../../domain/deliveryman/deliveryman.repository";

export class FindOneDeliverymanUseCase{
    constructor(private deliverymanRepo: DeliverymanRepositoryInterface){}
    async execute(id: string): Promise<FindOneDeliverymanOutput>{
        const deliveryman = await this.deliverymanRepo.findOne(id);
        return deliveryman.toJSON();
    }
}

type FindOneDeliverymanOutput={
    id: string;
    username: string;
    password: string;
}