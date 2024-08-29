import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    try {
      const song = new Song();
      song.title = songDTO.title;
      song.duration = songDTO.duration;
      song.lyrics = songDTO.lyrics;
      song.releasedDate = songDTO.releasedDate;

      // const artists = await this.artistRepository.findByIds(songDTO.artists);
      const artists = await this.artistRepository.findBy({
        id: In(songDTO.artists),
      });
      song.artists = artists;

      return this.songRepository.save(song);
    } catch (error) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  findAll(): Promise<Song[]> {
    // fetch songs from db
    // Error comes when searching data from db
    // throw new Error('Error comes when searching data from db');
    return this.songRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songRepository.findOneBy({ id });
  }

  async update(id: number, recordToUpdate: UpdateSongDTO): Promise<Song> {
    try {
      const song = await this.songRepository.findOneBy({ id });
      song.title = recordToUpdate.title;
      song.duration = recordToUpdate.duration;
      song.lyrics = recordToUpdate.lyrics;
      song.releasedDate = recordToUpdate.releasedDate;

      const artists = await this.artistRepository.findBy({
        id: In(recordToUpdate.artists),
      });
      song.artists = artists;

      return this.songRepository.save(song);
    } catch (error) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'ASC');
    return paginate<Song>(queryBuilder, options);
  }
}
