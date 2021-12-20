import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from '../../services/auth.service';
import { RegisterUserDto } from '@dto/user/register-user.dto';
import { Public } from '../../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  public getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  public async register(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }
}
