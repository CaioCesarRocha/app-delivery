import { Controller, Get, Post, Body, Put, Param, Delete, ConflictException } from '@nestjs/common';
import { DeliverymanService } from './deliveryman.service';
import { CreateDeliverymanDto } from './dto/create-deliveryman.dto';
import { UpdateDeliverymanDto } from './dto/update-deliveryman.dto';
import { CreateDeliverymanUseCase } from 'src/@core/application/deliveryman/create-deliveryman.use-case';
import { ListAllDeliverymanUseCase } from 'src/@core/application/deliveryman/list-all-deliveryman.use-case';
import { FindOneDeliverymanUseCase } from 'src/@core/application/deliveryman/find-one-deliveryman.use-case';
import { FindDeliverymanByUsernameUseCase } from 'src/@core/application/deliveryman/find-by-username.use-case';
import { UpdateDeliverymanUseCase } from 'src/@core/application/deliveryman/update-deliveryman.use-case';
import { DeleteDeliverymanUseCase } from 'src/@core/application/deliveryman/delete-deliveryman.use-case';

@Controller('deliveryman')
export class DeliverymanController {
  constructor(
    private createDeliverymanUseCase: CreateDeliverymanUseCase,
    private listAllDeliverymanUseCase: ListAllDeliverymanUseCase,
    private findOneDeliverymanUseCase: FindOneDeliverymanUseCase,
    private findDeliverymanByUsernameUseCase: FindDeliverymanByUsernameUseCase,
    private updateDeliverymanUseCase: UpdateDeliverymanUseCase,
    private deleteDeliveryman: DeleteDeliverymanUseCase
  ) {}

  @Post()
  async create(@Body() createDeliverymanDto: CreateDeliverymanDto) {
    const deliveryman = await this.findDeliverymanByUsernameUseCase.execute(createDeliverymanDto.username)
    console.log('deliveryman', deliveryman)
    if(deliveryman) throw new ConflictException('Deliveryman already exist');
    return this.createDeliverymanUseCase.execute(createDeliverymanDto);
  }

  @Get()
  findAll() {
    return this.listAllDeliverymanUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneDeliverymanUseCase.execute(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeliverymanDto: UpdateDeliverymanDto) {
    const newDeliveryman = { 
      id: updateDeliverymanDto.id, 
      username: updateDeliverymanDto.username,
      password: updateDeliverymanDto.password 
    }
    return this.updateDeliverymanUseCase.execute(id, newDeliveryman)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteDeliveryman.execute(id);
  }
}
