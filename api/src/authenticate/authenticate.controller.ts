import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { ClientAuthenticateDto } from './dto/client-authenticate.dto';
import { DeliverymanAuthenticateDto } from './dto/delvieryman-authenticate.dto';
import { AuthenticateClientUseCase } from 'src/@core/application/authenticate/authenticate-client.use-case';
import { AuthenticateDeliverymanUseCase } from 'src/@core/application/authenticate/authenticate-deliveryman.use-case';

@Controller('authenticate')
export class AuthenticateController {
  constructor(
      private authenticateClientUseCase: AuthenticateClientUseCase,
      private authenticateDeliverymanUseCase: AuthenticateDeliverymanUseCase
  ) {}

  @Post('/client')
  authenticateClient(@Body() clientAuthenticateDto: ClientAuthenticateDto) {
    return this.authenticateClientUseCase.execute(clientAuthenticateDto)
  }

  @Post('/deliveryman')
  authenticateDeliveryman(@Body() deliverymanAuthenticateDto: DeliverymanAuthenticateDto) {
    return this.authenticateDeliverymanUseCase.execute(deliverymanAuthenticateDto)
  }
}
