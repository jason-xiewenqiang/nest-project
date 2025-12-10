import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { AService } from './a.service';
import { CreateADto } from './dto/create-a.dto';
import { UpdateADto } from './dto/update-a.dto';
import { LoginGuard } from 'src/login.guard';
import { PermissionGuard } from 'src/user/permission.guard';

@Controller('a')
export class AController {
  constructor(private readonly aService: AService) {}

  @Post()
  @UseGuards(LoginGuard)
  create(@Body() createADto: CreateADto) {
    return this.aService.create(createADto);
  }

  @Get()
  @UseGuards(LoginGuard, PermissionGuard)
  @SetMetadata('permission', 'query_aaa')
  findAll() {
    return this.aService.findAll();
  }

  @Get(':id')
  @UseGuards(LoginGuard)
  findOne(@Param('id') id: string) {
    return this.aService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard)
  update(@Param('id') id: string, @Body() updateADto: UpdateADto) {
    return this.aService.update(+id, updateADto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard)
  remove(@Param('id') id: string) {
    return this.aService.remove(+id);
  }
}
