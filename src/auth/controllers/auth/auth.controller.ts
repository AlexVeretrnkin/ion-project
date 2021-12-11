import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from '../../services/auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RegisterUserDto } from '@dto/user/register-userDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  public async register(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }
}
