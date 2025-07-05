import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { CreateMemberDto } from './dto/creatre.member.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('AuthService', 'Login')
  login(loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @GrpcMethod('AuthService', 'AddMember')
  addMember(createMemberDto: CreateMemberDto) {
    return this.usersService.addMember(createMemberDto);
  }

  @GrpcMethod('AuthService', 'refreshToken')
  refreshToken(data: { refreshToken: string }) {
    return this.usersService.refreshToken(data.refreshToken);
  }

  @GrpcMethod('AuthService', 'GetUserById')
  getUserById(data: { id: string }) {
    return this.usersService.getUserById(data.id);
  }
}
