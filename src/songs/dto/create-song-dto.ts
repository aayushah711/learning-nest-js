import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsOptional()
  readonly lyrics: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly artists: string[];

  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;
}
