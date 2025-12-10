import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BService } from './b.service';
import { CreateBDto } from './dto/create-b.dto';
import { UpdateBDto } from './dto/update-b.dto';
import { LoginGuard } from 'src/login.guard';

@Controller('b')
export class BController {
  constructor(private readonly bService: BService) {}

  @Post()
  @UseGuards(LoginGuard)
  create(@Body() createBDto: CreateBDto) {
    return this.bService.create(createBDto);
  }

  @Get()
  @UseGuards(LoginGuard)
  findAll() {
    return this.bService.findAll();
  }

  @Get(':id')
  @UseGuards(LoginGuard)
  findOne(@Param('id') id: string) {
    return this.bService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard)
  update(@Param('id') id: string, @Body() updateBDto: UpdateBDto) {
    return this.bService.update(+id, updateBDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard)
  remove(@Param('id') id: string) {
    return this.bService.remove(+id);
  }
}
