import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ArtistRepository } from '../repositories/artist.repository';
import { IArtist, IArtistRequest } from '../interfaces/artist.interface';
import { FavoriteRepository } from 'src/modules/favorite/repositories/favorite.repository';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepo: ArtistRepository,
    private readonly favoriteRepo: FavoriteRepository,
  ) {}

  async findAll(): Promise<IArtist[]> {
    try {
      const artist = await this.artistRepo.getAll();
      return artist;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
  async checkArtistExists(artistId: string): Promise<IArtist> {
    try {
      const artist = await this.artistRepo.findOne({ id: artistId });
      if (!artist) {
        throw new NotFoundException(`Artist with ID ${artistId} not found`);
      }
      return artist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async getArtistByArtistId(artistId: string): Promise<IArtist> {
    return this.checkArtistExists(artistId);
  }

  async createArtist(body: IArtistRequest): Promise<string> {
    try {
      await this.artistRepo.create(body);
      return 'Create Successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async updateArtist(artistId: string, body: IArtistRequest): Promise<string> {
    const { name, grammy } = body;

    await this.checkArtistExists(artistId);

    try {
      await this.artistRepo.update({ id: artistId }, { name, grammy });
      return 'update successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async destroyArtist(artistId: string): Promise<string> {
    await this.checkArtistExists(artistId);
    try {
      const favorite = await this.favoriteRepo.findFirstRecord();
      if (favorite?.artists) {
        const trackIndex = favorite.artists.indexOf(artistId);
        if (trackIndex !== -1) {
          favorite.artists.splice(trackIndex, 1);
          await this.favoriteRepo.update({ id: favorite.id }, favorite);
        }
      }
      await this.artistRepo.delete({ id: artistId });
      return 'delete successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}
