import { Injectable } from '@nestjs/common';
import { DbService } from '@app/common/db/db.service';
import {
  AddMemberRequest,
  AddMemberResponse,
  GetUserByIdRequest,
  UserResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@app/common/types/auth';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices';
import { UserRole } from '@app/common/db/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    const { userId, email, password } = request;

    const user = await this.db.userRepo.findOne({
      where: userId ? { id: userId } : { email },
    });

    if (!user) throw new RpcException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new RpcException('Invalid credentials');
    }

    return {
      accessToken: this.generateAccessToken(user.id),
      refreshToken: this.generateRefreshToken(user.id),
      role: user.role,
      userId: user.id,
      organizationId: user.organizationId,
      organizationType: user.organizationType,
    };
  }

  async refreshToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    const userId = this.validateRefreshToken(request.refreshToken);
    if (!userId) throw new RpcException('Invalid refresh token');

    const user = await this.db.userRepo.findOneBy({ id: userId });
    if (!user) throw new RpcException('User not found');

    return {
      accessToken: this.generateAccessToken(user.id),
    };
  }

  async getUserById(request: GetUserByIdRequest): Promise<UserResponse> {
    const user = await this.db.userRepo.findOneBy({ id: request.id });
    if (!user) throw new RpcException('User not found');

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      organizationId: user.organizationId,
      organizationType: user.organizationType,
    };
  }

  async addMember(request: AddMemberRequest): Promise<AddMemberResponse> {
    const id = uuid();

    const hashedPassword = await bcrypt.hash(request.password, 10);

    await this.db.userRepo.insert({
      id,
      name: request.name,
      phone: request.phone,
      password: hashedPassword,
      role: request.role as UserRole,
      organizationId: request.organizationId,
      organizationType: request.organizationType,
    });

    return { userId: id };
  }

  private generateAccessToken(userId: string): string {
    return `access-token-${userId}`;
  }

  private generateRefreshToken(userId: string): string {
    return `refresh-token-${userId}`;
  }

  private validateRefreshToken(token: string): string | null {
    if (token.startsWith('refresh-token-')) {
      return token.replace('refresh-token-', '');
    }
    return null;
  }
}
