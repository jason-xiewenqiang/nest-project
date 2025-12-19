import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;
  
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    if(loginDto.username !== 'guang' || loginDto.password !== '123456') {
      throw new BadRequestException('用户名或密码错误');
    }
    const jwt = this.jwtService.sign({
      username: loginDto.username
    }, {
      secret: 'guang',
      expiresIn: '7d'
    });
    return jwt;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
