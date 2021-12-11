import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BaseUserModel } from '@models/user/base-user.model';
import { JWTPayload } from '@models/jwt/JWTPayload';
import { JwtResponse } from '@models/jwt/jwt-response';
import { RegisterUserDto } from '@dto/user/register-userDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    username: string,
    pass: string,
  ): Promise<BaseUserModel> {
    const user: BaseUserModel = await this.usersService.findUserByUserName(
      username,
    );

    if (await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  public async login(user: BaseUserModel): Promise<JwtResponse> {
    const payload: JWTPayload = { username: user.username, userId: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async register(user: RegisterUserDto): Promise<any> {
    if (!(await this.usersService.findUserByUserName(user.username))) {
      return this.usersService.createUser(user);
    }

    throw new HttpException(
      { error: 'User already exist', statusCode: HttpStatus.BAD_REQUEST },
      HttpStatus.BAD_REQUEST,
    );
  }
}
