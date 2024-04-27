import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, isNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
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
    example: 2020,
    description: 'year',
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;
}

export class UpdateAlbumDto {
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
    example: 2020,
    description: 'year',
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;
}
