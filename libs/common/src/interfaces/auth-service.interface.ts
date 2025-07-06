import { CreateMemberDto } from 'apps/auth/src/users/dto/creatre.member.dto';
import { LoginDto } from 'apps/auth/src/users/dto/login.dto';
import { Observable } from 'rxjs';

export interface AuthServiceGrpc {
  Login(data: LoginDto): Observable<{ token: string; userId: string }>;
  AddMember(data: CreateMemberDto): Observable<any>;
  refreshToken(data: { refreshToken: string }): Observable<{ token: string }>;
  GetUserById(data: { id: string }): Observable<any>;
}
