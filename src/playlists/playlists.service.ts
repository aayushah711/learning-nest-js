import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { CreatePlaylistDTO } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepo: Repository<Playlist>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playlistDTO.name;
    const songs = await this.songRepository.findBy({
      id: In(playlistDTO.songs),
    });
    playlist.songs = songs;
    const user = await this.userRepository.findOneBy({
      id: playlistDTO.user,
    });
    playlist.user = user;

    return this.playlistRepo.save(playlist);
  }
  //   findAll() {}
  //   update() {}
  //   delete() {}
}
