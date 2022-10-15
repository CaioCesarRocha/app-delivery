import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { DeliveryPrismaRepository } from 'src/@core/infra/db/prisma/repositorys/delivery.prisma.repository';
import { CreateDeliveryUseCase } from 'src/@core/application/delivery/create-delivery.use-case';
import { ListAllDeliveryUseCase } from 'src/@core/application/delivery/list-all-deliverys.use-case';
import { ListDeliverysClientUseCase } from 'src/@core/application/delivery/list-delivery-client.use-case';
import { ListDeliverysDeliverymanUseCase } from 'src/@core/application/delivery/list-deliverys-deliveryman.use-case';
import { ListAvailableDeliveryUseCase } from 'src/@core/application/delivery/list-delivery-avaliable.use-case';
import { SearchDeliveryUseCase } from 'src/@core/application/delivery/search-delivery.use-case';
import { FilterDeliveryUseCase } from 'src/@core/application/delivery/filter-delivery.use-case';
import { FindOneDeliveryUseCase } from 'src/@core/application/delivery/find-one-delivery.use-case';
import { UpdateDeliveryUseCase } from 'src/@core/application/delivery/update-delivery.use-case';
import { DeleteDeliveryUseCase } from 'src/@core/application/delivery/delete-delviery.use-case';

@Module({
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    { 
      provide: DeliveryPrismaRepository,//PROVENDO O REPOSITORY utilizando Prisma
      useFactory: () =>{
        return new DeliveryPrismaRepository()
      },
    },

    {
      provide: CreateDeliveryUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (deliveryRepo: DeliveryPrismaRepository) =>{ 
        return new CreateDeliveryUseCase(deliveryRepo)
      },
      inject: [DeliveryPrismaRepository]
    },

    {
      provide: ListAllDeliveryUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (deliveryRepo: DeliveryPrismaRepository) =>{ 
        return new ListAllDeliveryUseCase(deliveryRepo)
      },
      inject: [DeliveryPrismaRepository]
    },

    {
      provide: FindOneDeliveryUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (deliveryRepo: DeliveryPrismaRepository) =>{ 
        return new FindOneDeliveryUseCase(deliveryRepo)
      },
      inject: [DeliveryPrismaRepository]
    },

    {
      provide: ListDeliverysClientUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (deliveryRepo: DeliveryPrismaRepository) =>{ 
        return new ListDeliverysClientUseCase(deliveryRepo)
      },
      inject: [DeliveryPrismaRepository]
    },

    {
      provide: ListDeliverysDeliverymanUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (deliveryRepo: DeliveryPrismaRepository) =>{ 
        return new ListDeliverysDeliverymanUseCase(deliveryRepo)
      },
      inject: [DeliveryPrismaRepository]
    },

    {
      provide: ListAvailableDeliveryUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (deliveryRepo: DeliveryPrismaRepository) =>{ 
        return new ListAvailableDeliveryUseCase(deliveryRepo)
      },
      inject: [DeliveryPrismaRepository]
    },

    {
      provide: SearchDeliveryUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (deliveryRepo: DeliveryPrismaRepository) =>{ 
        return new SearchDeliveryUseCase(deliveryRepo)
      },
      inject: [DeliveryPrismaRepository]
    },

    {
      provide: FilterDeliveryUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (deliveryRepo: DeliveryPrismaRepository) =>{ 
        return new FilterDeliveryUseCase(deliveryRepo)
      },
      inject: [DeliveryPrismaRepository]
    },

    {
      provide: UpdateDeliveryUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (deliveryRepo: DeliveryPrismaRepository) =>{ 
        return new UpdateDeliveryUseCase(deliveryRepo)
      },
      inject: [DeliveryPrismaRepository]
    },

    {
      provide: DeleteDeliveryUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (deliveryRepo: DeliveryPrismaRepository) =>{ 
        return new DeleteDeliveryUseCase(deliveryRepo)
      },
      inject: [DeliveryPrismaRepository]
    },
  ]
})
export class DeliveryModule {}
