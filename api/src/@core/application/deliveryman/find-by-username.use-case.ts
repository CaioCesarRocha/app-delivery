import { DeliverymanRepositoryInterface } from "../../domain/deliveryman/deliveryman.repository";

export class FindDeliverymanByUsernameUseCase{
    constructor(private deliverymanRepo: DeliverymanRepositoryInterface){}
    async execute(username: string): Promise<FindByUsernameOutput | null>{
        const deliveryman = await this.deliverymanRepo.findByUsername(username);
        if(deliveryman.props.username === undefined) return null;
        return deliveryman.toJSON();
    }
}

type FindByUsernameOutput={
    id: string;
    username: string;
    password: string;
}