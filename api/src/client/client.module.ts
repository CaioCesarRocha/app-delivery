import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientPrismaRepository } from '../@core/infra/db/prisma/repositorys/client.prisma.repository';
import { CreateClientUseCase } from '../@core/application/client/create-client.use-case';
import { ListAllClientUseCase } from '../@core/application/client/list-all-client.use-case';
import { FindOneClientUseCase } from 'src/@core/application/client/find-one-client.use-case';
import { FindClientByUsernameUseCase } from 'src/@core/application/client/find-by-username.use-case';
import { UpdateClientUseCase } from 'src/@core/application/client/update-client.use-case';
import { DeleteClientUseCase } from 'src/@core/application/client/delete-client.use-case';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService,
    { 
      provide: ClientPrismaRepository,//PROVENDO O REPOSITORY utilizando Prisma
      useFactory: () =>{
        return new ClientPrismaRepository()
      },
    },

    {
      provide: CreateClientUseCase, //PROVENDO OS CASOS DE USO
      useFactory: (clientRepo: ClientPrismaRepository) =>{ 
        return new CreateClientUseCase(clientRepo)
      },
      inject: [ClientPrismaRepository]
    },

    {
      provide: ListAllClientUseCase,
      useFactory: (clientRepo: ClientPrismaRepository) =>{
        return new ListAllClientUseCase(clientRepo)
      },
      inject: [ClientPrismaRepository]
    },

    {
      provide: UpdateClientUseCase,
      useFactory: (clientRepo: ClientPrismaRepository) =>{
        return new UpdateClientUseCase(clientRepo)
      },
      inject: [ClientPrismaRepository]
    },

    {
      provide: FindOneClientUseCase,
      useFactory: (clientRepo: ClientPrismaRepository) =>{
        return new FindOneClientUseCase(clientRepo)
      },
      inject: [ClientPrismaRepository]
    },

    {
      provide: FindClientByUsernameUseCase,
      useFactory: (clientRepo: ClientPrismaRepository) =>{
        return new FindClientByUsernameUseCase(clientRepo)
      },
      inject: [ClientPrismaRepository]
    },

    {
      provide: DeleteClientUseCase,
      useFactory: (clientRepo: ClientPrismaRepository) =>{
        return new DeleteClientUseCase(clientRepo)
      },
      inject: [ClientPrismaRepository]
    },

  ]
})
export class ClientModule {}
