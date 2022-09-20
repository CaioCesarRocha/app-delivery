
import {Deliveryman} from '../../domain/devileryman/deliveryman.entity';
import { DeliverymanRepositoryInterface } from '../../domain/devileryman/deliveryman.repository';

export class UpdateDeliverymanUseCase{
    constructor(private deliverymanRepo:DeliverymanRepositoryInterface){}

    async execute(id: string, input: UpdateDeliverymanInput): Promise<UpdateDeliverymanOutput>{
       const deliveryman = Deliveryman.create(input, id); 
       await this.deliverymanRepo.update(id, deliveryman);
       return deliveryman.toJSON();
    }
}

type UpdateDeliverymanInput={
    id: string;
    username: string;
    password: string;
}

type UpdateDeliverymanOutput={
    id: string;
    username: string;
    password: string;
}