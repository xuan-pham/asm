import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AlbumRepository } from '../repositories/album.repository';
import { IAlbum, IAlbumRequest } from '../interfaces/album.interface';
import { FavoriteRepository } from 'src/modules/favorite/repositories/favorite.repository';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepo: AlbumRepository,
    private readonly favoriteRepo: FavoriteRepository,
  ) {}

  async findAll(): Promise<IAlbum[]> {
    try {
      return this.albumRepo.getAll();
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
  async checkAlbumExists(albumId: string): Promise<IAlbum> {
    try {
      const album = await this.albumRepo.findOne({ id: albumId });
      if (!album) {
        throw new NotFoundException(`Album with ID ${albumId} not found`);
      }
      return album;
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

  async getAlbumByAlbumId(albumId: string): Promise<IAlbum> {
    return this.checkAlbumExists(albumId);
  }

  async createAlbum(body: IAlbumRequest): Promise<string> {
    try {
      await this.albumRepo.create(body);
      return 'Create Successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async updateAlbum(albumId: string, body: IAlbumRequest): Promise<string> {
    const { name, year } = body;

    await this.checkAlbumExists(albumId);

    try {
      await this.albumRepo.update({ id: albumId }, { name, year });
      return 'update successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async destroyAlbum(albumId: string): Promise<string> {
    await this.checkAlbumExists(albumId);
    try {
      const favorite = await this.favoriteRepo.findFirstRecord();
      if (favorite?.albums) {
        const trackIndex = favorite.albums.indexOf(albumId);
        if (trackIndex !== -1) {
          favorite.albums.splice(trackIndex, 1);
          await this.favoriteRepo.update({ id: favorite.id }, favorite);
        }
      }

      await this.albumRepo.delete({ id: albumId });
      return 'delete successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}
