import { Injectable } from '@nestjs/common';
import BaseRepo from 'src/share/utils/baseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../entities/album.entity';

@Injectable()
export class AlbumRepository extends BaseRepo<AlbumEntity> {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {
    super(albumRepository);
  }
}
