import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { RegisterUserDto } from '@dto/user/register-userDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltOrRounds = 10;

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async findUserByUserName(username: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ username });
  }

  public async createUser(user: RegisterUserDto): Promise<InsertResult> {
    return bcrypt.hash(user.password, this.saltOrRounds).then((hash) =>
      this.usersRepository.insert({
        ...user,
        password: hash,
      }),
    );
  }
}
