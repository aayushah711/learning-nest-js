import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  // HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  //   Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('songs')
// @Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(`Connected to ${this.connection.CONNECTION_STRING}`);
  }
  @Post()
  create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
  }

  // findAll(): Promise<Song[]> {
  //   try {
  //     return this.songsService.findAll();
  //   } catch (error) {
  //     throw new HttpException(
  //       'server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       { cause: error },
  //     );
  //   }
  // }
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    return this.songsService.findOne(id);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateSongDTO: UpdateSongDTO,
  ): Promise<Song> {
    return this.songsService.update(id, updateSongDTO);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.songsService.remove(id);
  }
}
