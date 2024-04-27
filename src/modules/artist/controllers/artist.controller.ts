import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ValidateUuid } from 'src/share/decorators/validate-uuid.decorator';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto, UpdateArtistDto } from '../dto/artist.dto';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':artistId')
  @ApiParam({ name: 'artistId', type: 'string' })
  async getTrackByTrackId(@ValidateUuid('artistId') artistId: string) {
    return this.artistService.getArtistByArtistId(artistId);
  }

  @Post('register')
  async create(@Body() body: CreateArtistDto) {
    return this.artistService.createArtist(body);
  }

  @Put('/update/:artistId')
  @ApiParam({ name: 'artistId', type: 'string' })
  async update(
    @ValidateUuid('artistId') artistId: string,
    @Body() body: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(artistId, body);
  }

  @Delete('delete/:artistId')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @ApiParam({ name: 'artistId', type: 'string' })
  async remove(@ValidateUuid('artistId') artistId: string) {
    return this.artistService.destroyArtist(artistId);
  }
}
