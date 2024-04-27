import { ArtistRepository } from './../../artist/repositories/artist.repository';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FavoriteRepository } from '../repositories/favorite.repository';
import { IFavoritesResponse } from '../interfaces/favorite.interface';
import { TrackService } from 'src/modules/track/services/track.service';
import { AlbumService } from 'src/modules/album/services/album.service';
import { ArtistService } from 'src/modules/artist/services/artist.service';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepo: FavoriteRepository,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  async getAllFavorites(): Promise<IFavoritesResponse> {
    try {
      const favorite = await this.favoriteRepo.findFirstRecord();
      return {
        artists: favorite ? favorite.artists : [],
        albums: favorite ? favorite.albums : [],
        tracks: favorite ? favorite.tracks : [],
      };
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
  async CreateRecord(): Promise<void> {
    const favorite = await this.favoriteRepo.findFirstRecord();
    if (!favorite) {
      await this.favoriteRepo.create({
        artists: [],
        albums: [],
        tracks: [],
      });
    }
  }

  async checkFavoriteExists(): Promise<IFavoritesResponse> {
    const favorite = await this.favoriteRepo.findFirstRecord();
    if (!favorite) {
      throw new NotFoundException('Favorites not found');
    }
    return favorite;
  }

  async createTrack(id: string): Promise<void> {
    await this.CreateRecord();
    try {
      await this.trackService.checkTrackExists(id);

      const favorite = await this.favoriteRepo.findFirstRecord();
      if (!favorite.tracks.includes(id)) {
        favorite.tracks.push(id);
      }
      await this.favoriteRepo.create(favorite);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async removeTrack(id: string): Promise<void> {
    const favorite = await this.checkFavoriteExists();

    try {
      const trackIndex = favorite.tracks.indexOf(id);
      if (trackIndex === -1) {
        throw new NotFoundException('Track not in favorites');
      }

      favorite.tracks.splice(trackIndex, 1);
      await this.favoriteRepo.create(favorite);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async createAlbum(id: string): Promise<void> {
    await this.CreateRecord();
    try {
      await this.albumService.checkAlbumExists(id);

      const favorite = await this.favoriteRepo.findFirstRecord();
      if (!favorite.albums.includes(id)) {
        favorite.albums.push(id);
      }
      await this.favoriteRepo.create(favorite);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async removeAlbum(id: string): Promise<void> {
    const favorite = await this.checkFavoriteExists();

    try {
      const albumIndex = favorite.albums.indexOf(id);
      if (albumIndex === -1) {
        throw new NotFoundException('Album not in favorites');
      }

      favorite.albums.splice(albumIndex, 1);
      await this.favoriteRepo.create(favorite);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async createArtist(id: string): Promise<void> {
    await this.CreateRecord();
    try {
      await this.artistService.checkArtistExists(id);

      const favorite = await this.favoriteRepo.findFirstRecord();
      if (!favorite.artists.includes(id)) {
        favorite.artists.push(id);
      }
      await this.favoriteRepo.create(favorite);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async removeArtist(id: string): Promise<void> {
    const favorite = await this.checkFavoriteExists();

    try {
      const artistIndex = favorite.artists.indexOf(id);
      if (artistIndex === -1) {
        throw new NotFoundException('Artist not in favorites');
      }

      favorite.artists.splice(artistIndex, 1);
      await this.favoriteRepo.create(favorite);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}
