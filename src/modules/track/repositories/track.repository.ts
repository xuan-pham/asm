import { Injectable } from '@nestjs/common';
import BaseRepo from 'src/share/utils/baseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class TrackRepository extends BaseRepo<TrackEntity> {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {
    super(trackRepository);
  }

  async finOneRelation(id: string) {
    return this.trackRepository.findOne({
      relations: ['artist', 'album'],
      where: { id },
    });
  }
}
