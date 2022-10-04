import { Controller, Get, Post, Body, Put, Param, Delete, ConflictException} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientUseCase } from '../@core/application/client/create-client.use-case';
import { DeleteClientUseCase } from '../@core/application/client/delete-client.use-case';
import { FindClientByUsernameUseCase } from '../@core/application/client/find-by-username.use-case';
import { FindOneClientUseCase } from '../@core/application/client/find-one-client.use-case';
import { ListAllClientUseCase} from '../@core/application/client/list-all-client.use-case';
import { UpdateClientUseCase } from '../@core/application/client/update-client.use-case';

@Controller('clients')
export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private deleteClientUseCase: DeleteClientUseCase,
    private listAllClientUseCase: ListAllClientUseCase,
    private updateClientUseCase: UpdateClientUseCase,
    private findOneClienUseCase: FindOneClientUseCase,
    private findClientByUsername: FindClientByUsernameUseCase
  ){}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    const clientExist = await this.findClientByUsername.execute(createClientDto.username)
    if(clientExist) throw new ConflictException('Client already exist');
    return this.createClientUseCase.execute(createClientDto)
  }

  @Get()
  findAll() {
    return this.listAllClientUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneClienUseCase.execute(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.updateClientUseCase.execute(id, updateClientDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteClientUseCase.execute(id)
  }
}
