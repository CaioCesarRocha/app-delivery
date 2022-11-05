import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ClientModule } from './client/client.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { DeliveryModule } from './delivery/delivery.module';
import { EnsureAuthenticateClientMiddleware } from './middleware/ensureAuthenticateClient';
import { EnsureAuthenticateDeliverymanMiddleware } from './middleware/ensureAuthenticateDeliveryman';

@Module({
  imports: [
    //Temos um modulo global do Prisma, poderemos utilizar o PrismaClient em qualquer classe sem 
    //precisar criar uma instância nem mesmo importá-lo em seu respectivo módulo.
    PrismaModule, 
    ClientModule, 
    DeliverymanModule, 
    AuthenticateModule, DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticateClientMiddleware)
      .forRoutes(
        { path: 'delivery', method: RequestMethod.POST },
        { path: 'delivery/client', method: RequestMethod.GET },
        { path: 'delivery/:id', method: RequestMethod.DELETE },
        { path: 'clients/:id', method: RequestMethod.PUT}
      );
    consumer
      .apply(EnsureAuthenticateDeliverymanMiddleware)
      .forRoutes(
        { path: 'delivery/deliveryman', method: RequestMethod.GET },
        { path: 'delivery/:id', method: RequestMethod.PUT },
        { path: 'delivery/search/:search', method: RequestMethod.GET},
        { path: 'delivery/filter/:filter', method: RequestMethod.GET},
        { path: 'deliveryman/:id', method: RequestMethod.PUT},
        { path: 'delivery/available/:page', method: RequestMethod.GET}
    );
  }
}
