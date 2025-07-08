import { Controller } from '@nestjs/common';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  AddMemberRequest,
  AddMemberResponse,
  GetUserByIdRequest,
  UserResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@app/common/types/auth';
import { UsersService } from './users.service';

@Controller()
@AuthServiceControllerMethods()
export class UsersController implements AuthServiceController {
  constructor(private readonly usersService: UsersService) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.usersService.login(request);
  }

  async refreshToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    return this.usersService.refreshToken(request);
  }

  async getUserById(request: GetUserByIdRequest): Promise<UserResponse> {
    return this.usersService.getUserById(request);
  }

  async addMember(request: AddMemberRequest): Promise<AddMemberResponse> {
    return this.usersService.addMember(request);
  }
}
