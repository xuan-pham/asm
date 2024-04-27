import { Injectable } from '@nestjs/common';
import BaseRepo from 'src/share/utils/baseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../entities/artist.entity';

@Injectable()
export class ArtistRepository extends BaseRepo<ArtistEntity> {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {
    super(artistRepository);
  }
}
