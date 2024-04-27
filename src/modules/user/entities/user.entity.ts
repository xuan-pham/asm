import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/share/utils/baseEntity';
import { Column, Entity, VersionColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  login: string;

  @Column({ type: 'varchar', nullable: false })
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;
}
