import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { FavoriteService } from '../services/favorite.service';
import { ValidateUuid } from 'src/share/decorators/validate-uuid.decorator';

@ApiTags('Favorite')
@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  finAll() {
    return this.favoriteService.getAllFavorites();
  }

  @Post('/track/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async createTrack(@ValidateUuid('id') id: string) {
    return this.favoriteService.createTrack(id);
  }

  @Delete('/track/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async removeTrackFromFavorites(@ValidateUuid('id') id: string) {
    return this.favoriteService.removeTrack(id);
  }

  @Post('/album/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async createAlbum(@ValidateUuid('id') id: string) {
    return this.favoriteService.createAlbum(id);
  }

  @Delete('/album/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async removeAlbumFromFavorites(@ValidateUuid('id') id: string) {
    return this.favoriteService.removeAlbum(id);
  }

  @Post('/artist/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async createArtist(@ValidateUuid('id') id: string) {
    return this.favoriteService.createArtist(id);
  }

  @Delete('/artist/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async removeArtistFromFavorites(@ValidateUuid('id') id: string) {
    return this.favoriteService.removeArtist(id);
  }
}
