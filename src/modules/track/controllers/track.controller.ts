import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ValidateUuid } from 'src/share/decorators/validate-uuid.decorator';
import { CreateTrackDto, UpdateTrackDto } from '../dto/track.dto';
import { TrackService } from '../services/track.service';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':trackId')
  @ApiParam({ name: 'trackId', type: 'string' })
  async getTrackByTrackId(@ValidateUuid('trackId') trackId: string) {
    return this.trackService.getTrackByTrackId(trackId);
  }

  @Post('register')
  async create(@Body() body: CreateTrackDto) {
    return this.trackService.createTrack(body);
  }

  @Put('/update/:trackId')
  @ApiParam({ name: 'trackId', type: 'string' })
  async update(
    @ValidateUuid('trackId') trackId: string,
    @Body() body: UpdateTrackDto,
  ) {
    return this.trackService.updateTrack(trackId, body);
  }

  @Delete('delete/:trackId')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @ApiParam({ name: 'trackId', type: 'string' })
  async remove(@ValidateUuid('trackId') trackId: string) {
    return this.trackService.destroyTrack(trackId);
  }
}
