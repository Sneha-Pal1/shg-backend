import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AddMemberRequest,
  LoginRequest,
  RefreshTokenRequest,
} from '@app/common/types/auth';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginRequest) {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  refresh(@Body() body: RefreshTokenRequest) {
    return this.authService.refreshToken(body);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@CurrentUser('userId') userId: string) {
    return this.authService.getUserById({ id: userId });
  }

  @Post('add-member')
  @UseGuards(AuthGuard('jwt'))
  addMember(@Body() body: AddMemberRequest) {
    return this.authService.addMember(body);
  }
}
