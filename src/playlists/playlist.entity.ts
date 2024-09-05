import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Song, (song) => song.playlist) //Each lt will have multiple songs
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playlists) //Many Playlist can belong to a single unique user
  user: User; // The playlist table will include userId as a foreign key.
}
