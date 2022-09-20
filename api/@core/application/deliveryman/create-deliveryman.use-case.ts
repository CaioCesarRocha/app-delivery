
import {Deliveryman} from '../../domain/devileryman/deliveryman.entity';
import { DeliverymanRepositoryInterface } from '../../domain/devileryman/deliveryman.repository';

export class CreateDeliverymanUseCase{
    constructor(private deliverymanRepo:DeliverymanRepositoryInterface){}

    async execute(input: CreateDeliverymanInput): Promise<CreateDeliverymanOutput>{
       const deliveryman = Deliveryman.create(input); 
       await this.deliverymanRepo.insert(deliveryman)
       return deliveryman.toJSON();
    }
}

type CreateDeliverymanInput={
    username: string;
    password: string;
}

type CreateDeliverymanOutput={
    id: string;
    username: string;
    password: string;
}