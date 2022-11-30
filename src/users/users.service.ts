import {
  HttpException,
  HttpStatus,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async registerUser(createUserDto: CreateUserDto): Promise<any> {
    const user = new User();
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new HttpException(
        'password and confirm password must be similar',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.mobile = createUserDto.mobile;
    user.email = createUserDto.email;
    user.password = password;
    return await this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();

    return user;
  }

  async getUserByFirstName(firstName: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName: firstName })
      .addSelect('user.password')
      .getOne();

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
