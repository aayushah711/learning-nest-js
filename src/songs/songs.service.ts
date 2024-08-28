import { Injectable, Scope } from '@nestjs/common';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}
  // local array

  private readonly songs = [];

  create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    return this.songsRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    // fetch songs from db
    // Error comes when searching data from db
    // throw new Error('Error comes when searching data from db');
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  update(id: number, recordToUpdate: UpdateSongDTO): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.songsRepository.delete(id);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'ASC');
    return paginate<Song>(queryBuilder, options);
  }
}
