import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    //Temos um modulo global do Prisma, poderemos utilizar o PrismaClient em qualquer classe sem 
    //precisar criar uma instância nem mesmo importá-lo em seu respectivo módulo.
    PrismaModule, 
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
