import { BaseEntity } from 'src/share/utils/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoriteEntity extends BaseEntity {
  @Column({ type: 'varchar', array: true, nullable: true })
  artists: string[];

  @Column({ type: 'varchar', array: true, nullable: true })
  albums: string[];

  @Column({ type: 'varchar', array: true, nullable: true })
  tracks: string[];
}
