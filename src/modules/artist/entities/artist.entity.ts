import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { BaseEntity } from 'src/share/utils/baseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'artists' })
export class ArtistEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];
}
