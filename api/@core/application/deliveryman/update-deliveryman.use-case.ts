
import {Deliveryman} from '../../domain/devileryman/deliveryman.entity';
import { DeliverymanRepositoryInterface } from '../../domain/devileryman/deliveryman.repository';
import { hash } from 'bcrypt';

export class UpdateDeliverymanUseCase{
    constructor(private deliverymanRepo:DeliverymanRepositoryInterface){}

    async execute(id: string, input: UpdateDeliverymanInput): Promise<UpdateDeliverymanOutput>{
       const deliveryman = Deliveryman.create(input, id); 
       const hashPassword = await hash(deliveryman.password, 10)
       deliveryman.updatePassword(hashPassword)
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