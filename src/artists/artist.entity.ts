import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('artists')
export class Artist {
  @OneToOne(() => User)
  @JoinColumn() // ensures Artist table will have userId foreign key.
  user: User;

  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];

  @PrimaryGeneratedColumn()
  id: number;
}
