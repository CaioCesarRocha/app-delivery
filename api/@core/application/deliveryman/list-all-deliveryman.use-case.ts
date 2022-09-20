import { DeliverymanRepositoryInterface } from '../../domain/devileryman/deliveryman.repository';

export class ListAllDeliverymanUseCase{
    constructor(private deliverymanRepo:DeliverymanRepositoryInterface){}

    async execute(): Promise<ListAllDeliverymanOutput>{
       const deliverymen = await this.deliverymanRepo.listAll();
       return deliverymen.map( deliveryman => deliveryman.toJSON());
    }
}

type ListAllDeliverymanOutput={
    id: string;
    username: string;
    password: string;
}[];