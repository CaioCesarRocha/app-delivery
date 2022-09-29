import { DeliverymanRepositoryInterface } from "@core/domain/devileryman/deliveryman.repository";

export class FindDeliverymanByUsernameUseCase{
    constructor(private deliverymanRepo: DeliverymanRepositoryInterface){}
    async execute(username: string): Promise<FindByUsernameOutput | null>{
        const deliveryman = await this.deliverymanRepo.findByUsername(username);
        if(deliveryman.username === undefined) return null;
        return deliveryman.toJSON();
    }
}

type FindByUsernameOutput={
    id: string;
    username: string;
    password: string;
}