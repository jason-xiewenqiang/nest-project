import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { RegistryUserDto } from './dto/registry-user.dto';
import { LoginUserDto, User } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject(DbService) private dbService: DbService;

  async registry(registryUserDto: RegistryUserDto) {
    const users: User[] = await this.dbService.read();

    const existUser = users.find(
      (user) => user.username === registryUserDto.username,
    );

    if (existUser) {
      throw new BadRequestException('用户名已存在');
    }

    const newUser = new User();
    newUser.username = registryUserDto.username;
    newUser.password = registryUserDto.password;
    users.push(newUser);

    await this.dbService.write(users);
    return newUser;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();

    const existUser = users.find(
      (user) => user.username === loginUserDto.username,
    );

    if (!existUser) {
      throw new BadRequestException('用户名不存在');
    }

    if (existUser.password !== loginUserDto.password) {
      throw new BadRequestException('密码错误');
    }

    return existUser;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
