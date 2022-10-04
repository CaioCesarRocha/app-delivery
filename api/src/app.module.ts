import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ClientModule } from './client/client.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { DeliveryModule } from './delivery/delivery.module';

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
export class AppModule {}
