import { AuthServiceGrpc } from '@app/common/interfaces/auth-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateMemberDto } from 'apps/auth/src/users/dto/creatre.member.dto';
import { LoginDto } from 'apps/auth/src/users/dto/login.dto';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientGrpc) {}

  private authService: AuthServiceGrpc;

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceGrpc>('AuthService');
  }

  login(dto: LoginDto) {
    return this.authService.Login(dto); // gRPC call
  }

  addMember(data: CreateMemberDto): Observable<any> {
    return this.authService.AddMember(data);
  }

  refreshToken(token: string): Observable<any> {
    return this.authService.refreshToken({ refreshToken: token });
  }

  getUserById(id: string): Observable<any> {
    return this.authService.GetUserById({ id });
  }
}
