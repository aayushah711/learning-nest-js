import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  // local array

  private readonly songs = [];

  create(song) {
    // save the song in db
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // fetch songs from db
    // Error comes when searching data from db
    // throw new Error('Error comes when searching data from db');
    return this.songs;
  }
}
