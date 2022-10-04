import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateClientUseCase } from 'src/@core/application/authenticate/authenticate-client.use-case';
import { AuthenticateDeliverymanUseCase } from 'src/@core/application/authenticate/authenticate-deliveryman.use-case';
import { ClientPrismaRepository } from 'src/@core/infra/db/prisma/repositorys/client.prisma.repository';
import { DeliverymanPrismaRepository } from 'src/@core/infra/db/prisma/repositorys/deliveryman.repository';

@Module({
  controllers: [AuthenticateController],
  providers: [
    AuthenticateService,   
    {
      provide: ClientPrismaRepository,
      useFactory: () =>{
        return new ClientPrismaRepository()
      },
    },
    {
      provide: DeliverymanPrismaRepository,
      useFactory: () =>{
        return new DeliverymanPrismaRepository()
      },
    },

    {
      provide: AuthenticateClientUseCase, 
      useFactory: (clientRepo: ClientPrismaRepository) =>{ 
        return new AuthenticateClientUseCase(clientRepo)
      },
      inject: [ClientPrismaRepository]
    },

    {
      provide: AuthenticateDeliverymanUseCase, 
      useFactory: (deliverymanRepo: DeliverymanPrismaRepository) =>{ 
        return new AuthenticateDeliverymanUseCase(deliverymanRepo)
      },
      inject: [DeliverymanPrismaRepository]
    },
  ]
})
export class AuthenticateModule {}
