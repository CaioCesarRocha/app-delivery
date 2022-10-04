import { Injectable } from '@nestjs/common';
import { ClientAuthenticateDto } from './dto/client-authenticate.dto';
import { DeliverymanAuthenticateDto } from './dto/delvieryman-authenticate.dto';


@Injectable()
export class AuthenticateService {
  authenticateClient(clientAuthenticateDto: ClientAuthenticateDto) {
    return '';
  }

  authenticateDeliveryman(deliverymanAuthenticateDto: DeliverymanAuthenticateDto) {
    return ``;
  }

}
