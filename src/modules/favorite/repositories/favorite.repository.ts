import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { Injectable } from '@nestjs/common';
import BaseRepo from 'src/share/utils/baseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteRepository extends BaseRepo<FavoriteEntity> {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
  ) {
    super(favoriteRepository);
  }

  async findFirstRecord() {
    const favorite = await this.favoriteRepository.find({
      order: { createdAt: 'ASC' },
    });
    const firstRecord = favorite.length > 0 ? favorite[0] : null;
    return firstRecord;
  }
}
