import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    type: String,
    example: 'test1',
    description: 'name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    example: 12,
    description: 'duration',
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto {
  @ApiProperty({
    type: String,
    example: 'test1',
    description: 'name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    example: 12,
    description: 'duration',
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
