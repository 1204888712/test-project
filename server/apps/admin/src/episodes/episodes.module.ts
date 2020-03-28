import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { Media } from '@libs/db/models/media.model';

@Module({
  imports:[TypegooseModule.forFeature([Episode, Media])],
  controllers: [EpisodesController]
})
export class EpisodesModule {}
