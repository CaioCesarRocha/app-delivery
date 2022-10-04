import { Module } from '@nestjs/common';
import { DeliverymanService } from './deliveryman.service';
import { DeliverymanController } from './deliveryman.controller';
import { DeliverymanPrismaRepository } from 'src/@core/infra/db/prisma/repositorys/deliveryman.repository';
import { CreateDeliverymanUseCase } from 'src/@core/application/deliveryman/create-deliveryman.use-case';
import { ListAllDeliverymanUseCase } from 'src/@core/application/deliveryman/list-all-deliveryman.use-case';
import { FindOneDeliverymanUseCase } from 'src/@core/application/deliveryman/find-one-deliveryman.use-case';
import { FindDeliverymanByUsernameUseCase } from 'src/@core/application/deliveryman/find-by-username.use-case';
import { UpdateDeliverymanUseCase } from 'src/@core/application/deliveryman/update-deliveryman.use-case';
import { DeleteDeliverymanUseCase } from 'src/@core/application/deliveryman/delete-deliveryman.use-case';

@Module({
  controllers: [DeliverymanController],
  providers: [
    DeliverymanService,
    {
      provide: DeliverymanPrismaRepository,
      useFactory: () =>{
        return new DeliverymanPrismaRepository()
      },
    },

    {
      provide: CreateDeliverymanUseCase, 
      useFactory: (deliverymanRepo: DeliverymanPrismaRepository) =>{ 
        return new CreateDeliverymanUseCase(deliverymanRepo)
      },
      inject: [DeliverymanPrismaRepository]
    },

    {
      provide: ListAllDeliverymanUseCase, 
      useFactory: (deliverymanRepo: DeliverymanPrismaRepository) =>{ 
        return new ListAllDeliverymanUseCase(deliverymanRepo)
      },
      inject: [DeliverymanPrismaRepository]
    },

    {
      provide: FindOneDeliverymanUseCase, 
      useFactory: (deliverymanRepo: DeliverymanPrismaRepository) =>{ 
        return new FindOneDeliverymanUseCase(deliverymanRepo)
      },
      inject: [DeliverymanPrismaRepository]
    },

    {
      provide: FindDeliverymanByUsernameUseCase, 
      useFactory: (deliverymanRepo: DeliverymanPrismaRepository) =>{ 
        return new FindDeliverymanByUsernameUseCase(deliverymanRepo)
      },
      inject: [DeliverymanPrismaRepository]
    },

    {
      provide: UpdateDeliverymanUseCase, 
      useFactory: (deliverymanRepo: DeliverymanPrismaRepository) =>{ 
        return new UpdateDeliverymanUseCase(deliverymanRepo)
      },
      inject: [DeliverymanPrismaRepository]
    },

    {
      provide: DeleteDeliverymanUseCase, 
      useFactory: (deliverymanRepo: DeliverymanPrismaRepository) =>{ 
        return new DeleteDeliverymanUseCase(deliverymanRepo)
      },
      inject: [DeliverymanPrismaRepository]
    },

  ]
})
export class DeliverymanModule {}
