import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AddMemberRequest,
  AddMemberResponse,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  GetUserByIdRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  UserResponse,
} from '@app/common/types/auth';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private authClient: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return await firstValueFrom(this.authClient.login(data));
  }

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return await firstValueFrom(this.authClient.refreshToken(data));
  }

  async getUserById(data: GetUserByIdRequest): Promise<UserResponse> {
    return await firstValueFrom(this.authClient.getUserById(data));
  }

  async addMember(data: AddMemberRequest): Promise<AddMemberResponse> {
    return await firstValueFrom(this.authClient.addMember(data));
  }
}
