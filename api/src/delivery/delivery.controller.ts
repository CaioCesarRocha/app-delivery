import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import {Request} from 'express';
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
import { SearchDeliveryUseCase } from 'src/@core/application/delivery/search-delivery.use-case';
import { FilterDeliveryUseCase } from 'src/@core/application/delivery/filter-delivery.use-case';

@Controller('delivery')
export class DeliveryController {
  constructor(
    private createDeliveryUseCase: CreateDeliveryUseCase,
    private listAllDeliveryUseCase: ListAllDeliveryUseCase,
    private listDeliverysClientUseCase: ListDeliverysClientUseCase,
    private listDeliverysDeliverymanUseCase: ListDeliverysDeliverymanUseCase,
    private listAvailableDeliverysUseCase: ListAvailableDeliveryUseCase,
    private searchDeliveryUseCase: SearchDeliveryUseCase,
    private filterDeliveryUseCase: FilterDeliveryUseCase,
    private findOneDeliveryUseCase: FindOneDeliveryUseCase,
    private updateDeliveryUseCase: UpdateDeliveryUseCase,
    private deleteDeliveryUseCase: DeleteDeliveryUseCase
  ) {}

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto, @Req() req:Request) {
    const id_client = req.body['id_client']; //id_client vrm depois de ser válido no middlware
    const newDelivery = { id_client, ...createDeliveryDto}
    return this.createDeliveryUseCase.execute(newDelivery)
  }

  @Get()
  findAll() {
    return this.listAllDeliveryUseCase.execute()
  }

  @Get('/client')
  listDeliverysClient(@Req() req:Request) {
    const id_client = req.body['id_client'];
    return this.listDeliverysClientUseCase.execute(id_client)
  }

  @Get('/deliveryman')
  listDeliverysDeliveryman(@Req() req:Request) {
    const id_client = req.body['id_deliveryman'];
    return this.listDeliverysDeliverymanUseCase.execute(id_client)
  }

  @Get('/available')
  listAvailableDeliverys() {
    return this.listAvailableDeliverysUseCase.execute()
  }

  @Get('/search/:search')
  searchDeliverys(@Param('search') search: string) {
    return this.searchDeliveryUseCase.execute(search)
  }

  @Get('/filter/:filter')
  filterDeliverys(@Param('filter') filter: string) {
    return this.filterDeliveryUseCase.execute(filter)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneDeliveryUseCase.execute(id)
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto,@Req() req:Request) {
    const id_deliveryman = req.body['id_deliveryman'];
    const newDelivery = { id_deliveryman, ...updateDeliveryDto}
    return this.updateDeliveryUseCase.execute(id, newDelivery)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteDeliveryUseCase.execute(id)
  }
}
