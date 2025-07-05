import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'ID is required! Please provide ID' })
  @IsString({ message: 'ID must be a string' })
  id: string;

  @IsNotEmpty({ message: 'Password is required! Please provide password' })
  password: string;
}
