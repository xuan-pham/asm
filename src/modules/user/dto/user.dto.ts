import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'test1',
    description: 'login',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: String,
    example: 'test1',
    description: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    type: String,
    example: 'test1',
    description: 'login',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    type: String,
    example: 'test1',
    description: 'login',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
