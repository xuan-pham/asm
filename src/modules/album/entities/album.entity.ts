import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { BaseEntity } from 'src/share/utils/baseEntity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'albums' })
export class AlbumEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity | null;

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[];
}
