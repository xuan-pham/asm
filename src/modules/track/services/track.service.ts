import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TrackRepository } from '../repositories/track.repository';
import { ITrack, ITrackRequest } from '../interfaces/track.interface';
import { FavoriteRepository } from 'src/modules/favorite/repositories/favorite.repository';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepo: TrackRepository,
    private readonly favoriteRepo: FavoriteRepository,
  ) {}

  async findAll(): Promise<ITrack[]> {
    try {
      const trackList = await this.trackRepo.getAll();
      return trackList;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
  async checkTrackExists(trackId: string): Promise<ITrack> {
    try {
      const track = await this.trackRepo.finOneRelation(trackId);
      if (!track) {
        throw new NotFoundException(`Track with ID ${trackId} not found`);
      }
      return track;
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

  async getTrackByTrackId(trackId: string): Promise<ITrack> {
    return this.checkTrackExists(trackId);
  }

  async createTrack(body: ITrackRequest): Promise<string> {
    try {
      await this.trackRepo.create(body);
      return 'Create Successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async updateTrack(trackId: string, body: ITrackRequest): Promise<string> {
    const { name, duration } = body;

    await this.checkTrackExists(trackId);

    try {
      await this.trackRepo.update({ id: trackId }, { name, duration });
      return 'update successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async destroyTrack(trackId: string): Promise<string> {
    await this.checkTrackExists(trackId);
    try {
      const favorite = await this.favoriteRepo.findFirstRecord();
      if (favorite?.tracks) {
        const trackIndex = favorite.tracks.indexOf(trackId);
        if (trackIndex !== -1) {
          favorite.tracks.splice(trackIndex, 1);
          await this.favoriteRepo.update({ id: favorite.id }, favorite);
        }
      }

      await this.trackRepo.delete({ id: trackId });
      return 'delete successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}
