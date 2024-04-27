import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ValidateUuid } from 'src/share/decorators/validate-uuid.decorator';
import { CreateAlbumDto, UpdateAlbumDto } from '../dto/album.dot';
import { AlbumService } from '../services/album.service';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':albumId')
  @ApiParam({ name: 'albumId', type: 'string' })
  async getTrackByTrackId(@ValidateUuid('albumId') albumId: string) {
    return this.albumService.getAlbumByAlbumId(albumId);
  }

  @Post('register')
  async create(@Body() body: CreateAlbumDto) {
    return this.albumService.createAlbum(body);
  }

  @Put('/update/:albumId')
  @ApiParam({ name: 'albumId', type: 'string' })
  async update(
    @ValidateUuid('albumId') albumId: string,
    @Body() body: UpdateAlbumDto,
  ) {
    return this.albumService.updateAlbum(albumId, body);
  }

  @Delete('delete/:albumId')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @ApiParam({ name: 'albumId', type: 'string' })
  async remove(@ValidateUuid('albumId') albumId: string) {
    return this.albumService.destroyAlbum(albumId);
  }
}
