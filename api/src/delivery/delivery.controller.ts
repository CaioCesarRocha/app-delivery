import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { CreateDeliveryUseCase } from 'src/@core/application/delivery/create-delivery.use-case';
import { ListAllDeliveryUseCase } from 'src/@core/application/delivery/list-all-deliverys.use-case';
import { FindOneDeliveryUseCase } from 'src/@core/application/delivery/find-one-delivery.use-case';
import { ListDeliverysClientUseCase } from 'src/@core/application/delivery/list-delivery-client.use-case';
import { ListDeliverysDeliverymanUseCase } from 'src/@core/application/delivery/list-deliverys-deliveryman.use-case';
import { ListAvailableDeliveryUseCase } from 'src/@core/application/delivery/list-delivery-avaliable.use-case';
import { UpdateDeliveryUseCase } from 'src/@core/application/delivery/update-delivery.use-case';
import { DeleteDeliveryUseCase } from 'src/@core/application/delivery/delete-delviery.use-case';

@Controller('delivery')
export class DeliveryController {
  constructor(
    private createDeliveryUseCase: CreateDeliveryUseCase,
    private listAllDeliveryUseCase: ListAllDeliveryUseCase,
    //private listDeliverysClientUseCase: ListDeliverysClientUseCase,
   // private listDeliverysDeliverymanUseCase: ListDeliverysDeliverymanUseCase,
    private listAvailableDeliverysUseCase: ListAvailableDeliveryUseCase,
    private findOneDeliveryUseCase: FindOneDeliveryUseCase,
    private updateDeliveryUseCase: UpdateDeliveryUseCase,
    private deleteDeliveryUseCase: DeleteDeliveryUseCase
  ) {}

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.createDeliveryUseCase.execute(createDeliveryDto)
  }

  @Get()
  findAll() {
    return this.listAllDeliveryUseCase.execute()
  }

  /*
  @Get('/client')
  listDeliverysClient() {
    return this.listDeliverysClientUseCase.execute()
  }

  @Get('/deliveryman')
  listDeliverysDeliveryman() {
    return this.listDeliverysDeliverymanUseCase.execute()
  }*/

  @Get('/available')
  listAvailableDeliverys() {
    console.log('passei aquiii controller')
    return this.listAvailableDeliverysUseCase.execute()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('passei aquiii controllerfidnoe')
    return this.findOneDeliveryUseCase.execute(id)
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.updateDeliveryUseCase.execute(id, updateDeliveryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteDeliveryUseCase.execute(id)
  }
}
