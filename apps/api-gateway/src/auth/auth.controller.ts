import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'apps/auth/src/users/dto/login.dto';
import { CreateMemberDto } from 'apps/auth/src/users/dto/creatre.member.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() dto: CreateMemberDto) {
    return this.authService.addMember(dto);
  }

  @Post('refresh')
  refresh(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return this.authService.getUserById(id);
  }
}
