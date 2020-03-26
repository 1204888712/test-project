import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';

@Module({
  imports:[TypegooseModule.forFeature([Episode])],
  controllers: [EpisodesController]
})
export class EpisodesModule {}
