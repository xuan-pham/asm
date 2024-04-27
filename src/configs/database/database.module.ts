import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_DATABASE'),
        entities: [
          UserEntity,
          TrackEntity,
          FavoriteEntity,
          ArtistEntity,
          AlbumEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
