import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateMemberDto } from './dto/creatre.member.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { id: loginDto.id },
    });

    if (
      !user ||
      !(await this.verifyPassword(loginDto.password, user.password))
    ) {
      throw new UnauthorizedException(
        'Invalid credentials or account not exists',
      );
    }

    const token = this.generateTokens(user);
    const { password, ...result } = user;
  }
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'refresh_secret',
      });
      const user = await this.userRepo.findOne({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      const acessToken = this.generateAccessToken(user);
      return { acessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async addMember(data: CreateMemberDto) {
    const password = Math.random().toString(16).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const member = this.userRepo.create({
      name: data.name,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
      designation: data.designation,
      fatherOrHusbandName: data.fatherOrHusbandName,
      category: data.category,
      disability: data.disability,
      religion: data.religion,
      gender: data.gender,
      accountAvailable: data.accountAvailable,
    });

    await this.userRepo.save(member);
    return {
      id: member.id,
      name: member.name,
      phoneNumber: member.phoneNumber,
      designation: member.designation,
      password,
    };
  }

  async getUserById(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      designation: user.designation,
    };
  }

  private async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private generateTokens(user: User) {
    return {
      acessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }
  private generateAccessToken(user: User): string {
    const payload = {
      userId: user.id,
      designation: user.designation,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expireIn: '15m' });
  }
  private generateRefreshToken(user: User): string {
    const payload = {
      userId: user.id,
      designation: user.designation,
    };
    return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  }
}
