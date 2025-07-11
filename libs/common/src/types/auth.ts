// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.5
//   protoc               v3.20.3
// source: auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface LoginRequest {
  /** for SHG / VO / CLF */
  userId?:
    | string
    | undefined;
  /** for all including TRLM / NIC */
  email?: string | undefined;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
  userId: string;
  organizationId: string;
  organizationType: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface GetUserByIdRequest {
  id: string;
}

export interface UserResponse {
  id: string;
  name: string;
  phone: string;
  role: string;
  organizationId: string;
  organizationType: string;
}

export interface AddMemberRequest {
  name: string;
  phone: string;
  password: string;
  /** Enum in client side: shg_member, vo_member, clf_member */
  role: string;
  organizationId: string;
  /** shg, vo, clf */
  organizationType: string;
}

export interface AddMemberResponse {
  userId: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  login(request: LoginRequest): Observable<LoginResponse>;

  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse>;

  getUserById(request: GetUserByIdRequest): Observable<UserResponse>;

  addMember(request: AddMemberRequest): Observable<AddMemberResponse>;
}

export interface AuthServiceController {
  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  refreshToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> | Observable<RefreshTokenResponse> | RefreshTokenResponse;

  getUserById(request: GetUserByIdRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  addMember(request: AddMemberRequest): Promise<AddMemberResponse> | Observable<AddMemberResponse> | AddMemberResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "refreshToken", "getUserById", "addMember"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
